const functions = require("firebase-functions");
const admin = require("firebase-admin");
const crypto = require("crypto");
const cors = require("cors")({ origin: true });

admin.initializeApp();
const firestore = admin.firestore();

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
