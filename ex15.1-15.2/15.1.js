import mongodb from "mongodb";
import { restaurants } from "./resturants.js";

const { MongoClient } = mongodb;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "findMyRestaurant";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) return console.log("Unable to connet to database");

    const db = client.db(databaseName);

    // db.collection("resturants").insertMany(restaurants);

    // 1.1
    // db.collection("resturants")
    //   .find()
    //   .toArray((err, res) => {
    //     console.log(res);
    //   });

    // 1.2
    // db.collection("resturants")
    //   .find({ cuisine: "Italian" })
    //   .toArray((err, res) => {
    //     console.log(res);
    //   });

    // 1.3
    // db.collection("resturants")
    //   .find({ isKosher: true })
    //   .toArray((err, res) => {
    //     console.log(res);
    //   });

    // 1.4
    // db.collection("resturants")
    //   .find({ "adress.city": "Los Angeles" })
    //   .toArray((err, res) => {
    //     console.log(res);
    //   });

    // 1.5
    // db.collection("resturants").findOne(
    //   {
    //     name: "CASSELL'S",
    //   },
    //   (err, res) => {
    //     console.log(res.adress);
    //   }
    // );

    // 1.6
    // db.collection("resturants").findOne(
    //   {
    //     name: "CASSELL'S",
    //   },
    //   (err, res) => {
    //     console.log(res.adress.coordinates);
    //   }
    // );

    // 1.7
    // db.collection("resturants")
    //   .find()
    //   .sort({ name: 1 })
    //   .forEach((res) => console.log(res));

    // 1.8;
    // db.collection("resturants")
    //   .find()
    //   .sort({ "adress.city": 1 })
    //   .forEach((res) => console.log(res));

    // 1.9
    // db.collection("resturants").updateOne(
    //   { name: "ANGELIQUE" },
    //   { $set: { name: "zzzzzz" } }
    // );

    // 1.10
    // db.collection("resturants").updateOne(
    //   { name: "zzzzzz" },
    //   { $push: { reviews: { date: "23/5/2000", score: 5 } } }
    // );

    // 1.11
    // db.collection("resturants").updateMany(
    //   { isKosher: false },
    //   { $set: { isKosher: true } }
    // );

    // 1.12
    // db.collection("resturants").deleteOne({ name: "zzzzzz" });

    // 1.13
    // db.collection("resturants").deleteMany();

    // 2.1
    // db.collection("resturants")
    //   .find()
    //   .forEach((res) => console.log(res.name));

    // 2.2
    // db.collection("resturants")
    //   .find()
    //   .forEach((res) => console.log(res.adress.city));

    // 2.3
    // db.collection("resturants")
    //   .find()
    //   .forEach((res) => console.log(res.adress.coordinates));

    // 3.1
    // db.collection("resturants")
    //   .find({ name: { $regex: /^b/, $options: "i" } })
    //   .forEach((res) => console.log(res));
    // db.collection("resturants")
    //   .find({ name: /^b/i })
    //   .forEach((res) => console.log(res));

    // 3.2
    // db.collection("resturants")
    //   .countDocuments()
    //   .then((res) => console.log(res));

    // db.collection("resturants")
    //   .estimatedDocumentCount()
    //   .then((res) => console.log(res));

    // 3.3
    // db.collection("resturants")
    //   .find({ "reviews.date": "30/12/3567" })
    //   .forEach((res) => console.log(res));

    // 4.1
    // db.collection("resturants")
    //   .aggregate([
    //     { $unwind: "$reviews" },
    //     { $group: { _id: "$name", avgScore: { $avg: "$reviews.score" } } },
    //   ])
    //   .forEach((res) => console.log(res));

    // 4.2
    db.collection("resturants")
      .aggregate([
        { $match: { name: "GREEN'S" } },
        { $unwind: "$reviews" },
        { $group: { _id: "$name", avgScore: { $avg: "$reviews.score" } } },
      ])
      .forEach((res) => console.log(res));
  }
);
