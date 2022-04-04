import admin from "firebase-admin";
import serviceAccount from "./serviceAccount.js";
import { getFirestore } from "firebase-admin/firestore";

import fs from "fs";

async function main() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  const db = getFirestore();
  const docRef = db.collection("heart-rates").doc("maddy-history");
  const data = (await docRef.get()).data();
  const heartRates = Object.entries(data)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .map(([_, x]) => x)
    .flat()
    .map(parseFloat)
    .filter((x) => !isNaN(x));

  console.log(heartRates);
  fs.writeFileSync("heart-rates.tsv", heartRates.join("\t"));
}

main();
