import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccountPath = path.resolve("./src/firebase/serviceAccountKey.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ Service account key file not found.");
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

const db = getFirestore();
const localFilePath = path.resolve("./src/data/characters.json");

async function uploadCharactersToFirestore() {
  try {
    const fileContent = fs.readFileSync(localFilePath, "utf-8");
    const characters = JSON.parse(fileContent);

    for (const character of characters) {
      if (!character.matadata || !character.matadata.username) {
        console.warn(`⚠️ Skipping character ${character?.basicInfo?.name || "Unknown"} (No username found)`);
        continue;
      }

      const characterID = character.matadata.username; // Use username as document ID
      const characterRef = db.collection("characters").doc(characterID);
      const docSnapshot = await characterRef.get();

      // Extract notifications if available
      let notifications = {};
      if (character.notifications) {
        notifications = Object.entries(character.notifications).map(([key, notification]) => ({
          id: key,
          senderName: notification.senderName || "Unknown",
          unixtimestamp: notification.unixtimestamp || Date.now() / 1000, // Default to current timestamp
          message: notification.message || "",
        }));
      }

      const characterData = {
        metadata: character.matadata || {},
        basicInfo: character.basicInfo || {},
        characteristics: character.characteristics || {},
        skills: character.skills || {},
        characterDescriptions: character.characterDescriptions || {},
        weapons: character.weapons || {},
        items: character.items || {},
        notifications, // Store notifications as an array
      };

      if (docSnapshot.exists) {
        await characterRef.update(characterData); // Update existing character
        console.log(`🔄 Updated character: ${character.basicInfo.name} (ID: ${characterID})`);
      } else {
        await characterRef.set(characterData); // Create new character
        console.log(`✅ Created new character: ${character.basicInfo.name} (ID: ${characterID})`);
      }
    }

    console.log("🎉 All characters uploaded/updated successfully to Firestore!");
  } catch (error) {
    console.error("❌ Error uploading characters to Firestore:", error);
  }
}

// Run the function
uploadCharactersToFirestore();
