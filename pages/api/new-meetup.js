import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = MongoClient.connect(
      "mongodb+srv://dh6425:K2uw1PblDkbXN1i0@meetup.c5hnj2z.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = (await client).db();

    const meetupCollection = db.collection("meetup");

    const result = await meetupCollection.insertOne(data);

    console.log(result);

    (await client).close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
