import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// Initialize app once
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();
export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const getSpecs = onRequest(async (request, response) => {
  logger.info("Hello logs 2!", { structuredData: true });

  try {
    const snapshot = await db.collection('specs').get();
    const specs: { id: string; }[] = [];
    snapshot.forEach((doc) => {
      logger.info(`Fetched doc: ${doc.id}`, doc.data());
      specs.push({ id: doc.id, ...doc.data() });
    });
    response.json(specs);
  } catch (error) {
    logger.error("Error fetching specs:", error);
    response.status(500).json({ error: "Failed to fetch specs" });
  }
});
