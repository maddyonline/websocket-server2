import { WebSocketServer } from "ws";
import admin from "firebase-admin";
import serviceAccount from "./serviceAccount.js";
import { getFirestore } from "firebase-admin/firestore";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const wss = new WebSocketServer({ port: 1323 });
const db = getFirestore();
console.log(db);
const docRef = db.collection("heart-rates").doc("maddy");

wss.on("connection", function connection(ws) {
  ws.on("message", async function message(data) {
    console.log("received: %s", data);
    await docRef.set({
      data,
      from: "server",
    });
  });

  ws.send("something");
});
