const functions = require("firebase-functions");
const admin = require("firebase-admin");
const crypto = require("crypto");
const cors = require("cors")({ origin: true });

admin.initializeApp();
const firestore = admin.firestore();
const db = admin.firestore();

exports.shortenURL = functions.https.onRequest(async (request, response) => {
  return cors(request, response, async () => {
    if (request.method !== "POST") {
      return response.status(405).send("Method Not Allowed");
    }

    const originalURL = request.body.originalURL;
    const shortCode = generateShortCode(originalURL); // Implement this function to generate a short code

    await firestore.collection("urls").doc(shortCode).set({
      ShortCode: shortCode,
      OriginalURL: originalURL,
      CreationDate: admin.firestore.Timestamp.now(),
      AccessCount: 0,
      // Add ExpirationDate if applicable
    });
    response.send({ shortCode });
  });
});

exports.redirect = functions.https.onRequest(async (request, response) => {
  const shortCode = request.path.slice(1);
  const urlDocumentRef = await firestore
    .collection("urls")
    .where("ShortCode", "==", shortCode)
    .get();

  if (urlDocumentRef.empty) {
    return response.status(404).send("URL not found");
  }

  const urlDocument = urlDocumentRef.docs[0];
  const originalURL = urlDocument.data().OriginalURL;

  // Record the click
  await firestore.collection("clicks").add({
    URLId: urlDocument.ref,
    ClickedDate: admin.firestore.Timestamp.now(),
    // Add Referrer, UserAgent, UserIP if available
  });

  // Update access count
  await urlDocument.ref.update({
    AccessCount: admin.firestore.FieldValue.increment(1),
  });

  response.redirect(originalURL);
});

function generateShortCode(originalURL) {
  // Create a SHA-1 hash of the URL
  const hash = crypto.createHash("sha1").update(originalURL).digest("base64");

  // Convert to Base64 and truncate to desired length
  const length = 6; // Adjust length as needed
  return hash.replace(/\+/g, "-").replace(/\//g, "_").substring(0, length);
}
module.exports.addNewUser = functions.https.onCall(async (data, context) => {
  // if (!context.auth.token.isAdmin) {
  //   throw new functions.https.HttpsError("permission-denied");
  // }

  const {
    displayName,
    email,
    phone: phoneNumber,
    organization,
    notes,
    isAdmin,
    password,
  } = data;

  if (!typeof displayName === "string") {
    return {
      status: "error",
      message: "Please provide a valid display name",
    };
  }

  if (!typeof email === "string") {
    return {
      status: "error",
      message: "Please provide a valid email",
    };
  }

  return admin
    .auth()
    .createUser({
      email,
      displayName,
      password,
    })
    .then(async (userRecord) => {
      const uid = userRecord.uid;
      console.log("uid: " + uid);
      const userDoc = {
        email,
        displayName,
        phoneNumber,
        notes,
        organization,
      };

      const claims = {};

      if (isAdmin) {
        userDoc["isAdmin"] = true;
        claims["isAdmin"] = true;
      }

      console.log("start to create doc");

      await db.doc(`/users/${uid}`).set(userDoc);

      await admin.auth().setCustomUserClaims(uid, claims);

      return {
        status: "success",
        message: `${displayName} created`,
      };
    })
    .catch((error) => {
      console.log("Error creating new user:", error);
    });
});

module.exports.updateUser = functions.firestore
  .document("/users/{user}")
  .onUpdate(async (snapshot, context) => {
    const { user } = context.params;
    const after = snapshot.after.data();

    if (after.isAdmin === true) {
      claims["isAdmin"] = true;
    }

    return admin.auth().setCustomUserClaims(user, claims);

    // update user claims if isAdmin has changed.
  });

module.exports.disableUser = functions.https.onCall(async (data, context) => {
  const { uid, status } = data;

  // Admin can disable, you cannot disable yourself :-)
  if (!context.auth.token.isAdmin || context.auth.token.uid === uid) {
    throw new functions.https.HttpsError("permission-denied");
  }

  return admin
    .auth()
    .updateUser(uid, {
      disabled: !status,
    })
    .then(async (userRecord) => {
      await db.doc(`users/${uid}`).update({ disabled: !status });
      return {
        status: "success",
        message: "User updated",
        payload: userRecord,
      };
    })
    .catch((err) => {
      console.log(err);
      return {
        status: "warning",
        message: "Could not update user",
      };
    });
});

module.exports.deleteUser = functions.https.onCall(async (data, context) => {
  const { uid } = data;

  if (!context.auth.token.isAdmin || context.auth.token.uid === uid) {
    throw new functions.https.HttpsError("permission-denied");
  }

  return admin
    .auth()
    .deleteUser(uid)
    .then(async (res) => {
      await db.doc(`users/${uid}`).delete();
      return {
        status: "success",
        message: "User deleted",
      };
    })
    .catch((error) => {
      return {
        status: "error",
        message: "Could not delete user",
      };
    });
});
