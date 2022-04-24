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
  const heartRates = Object.entries(data);

  const flatEntries = [];
  for (const x of heartRates) {
    const [ts, entries] = x;
    const start = new Date(ts).getTime();
    for (let i = 0; i < entries.length; i++) {
      if (entries[i] !== "watch") {
        flatEntries.push([
          JSON.parse(JSON.stringify(new Date(start + i * 5000))),
          entries[i],
        ]);
      }
    }

  }

  fs.writeFileSync(
    "heart-rates.tsv",
    flatEntries.map((x) => x.join("\t")).join("\n")
  );
}

main();
