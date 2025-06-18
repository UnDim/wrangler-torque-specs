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

export const getSpecs = onRequest(async (request, response) => {
  logger.info("Hello logs 2!", { structuredData: true });

  try {
    // Get the 'generation' parameter from query string
    const generation = request.query.generation;
    const category = request.query.category;

    let query: FirebaseFirestore.Query = db.collection('specs');

    if (generation) {
      logger.info(`Filtering by generation: ${generation}`);
      query = query.where('generation', '==', generation);
    }

    if (category) {
      logger.info(`Filtering by component-group: ${category}`);
      query = query.where('component-group', '==', category);
    }

    const snapshot = await query.get();
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

export const getGenerations = onRequest(async (request, response) => {
  logger.info("Fetching distinct generation values", { structuredData: true });

  try {
    const snapshot = await db.collection('specs').get();
    const generationsSet = new Set<string>();

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.generation) {
        generationsSet.add(data.generation);
      }
    });

    const generations = Array.from(generationsSet).sort();
    response.json(generations);
  } catch (error) {
    logger.error("Error fetching generations:", error);
    response.status(500).json({ error: "Failed to fetch generations" });
  }
});

export const getCategories = onRequest(async (request, response) => {
  logger.info("Fetching distinct component-group values", { structuredData: true });

  try {
    const snapshot = await db.collection('specs').get();
    const categorySet = new Set<string>();

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data['component-group']) {
        categorySet.add(data['component-group']);
      }
    });

    const categories = Array.from(categorySet).sort();
    response.json(categories);
  } catch (error) {
    logger.error("Error fetching categories:", error);
    response.status(500).json({ error: "Failed to fetch categories" });
  }
});
