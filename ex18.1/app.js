import express from "express";
import mongoose from "mongoose";
import { Product } from "../ex17.1/app.js";

const app = express();

app.get("/products", (req, res, next) => {
  if (Object.keys(req.query).length > 0) {
    next();
    return;
  }
  Product.find()
    .then((products) => {
      res.send(products);
    })
    .catch((e) => {
      res.send(e);
    });
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((product) => res.send(product))
    .catch((e) => res.send(e));
});

app.get("/products", (req, res) => {
  const { isActive, minPrice, maxPrice } = req.query;
  if (isActive === true || isActive === false) {
    return Product.find({ isActive })
      .then((results) => {
        res.send(results);
      })
      .catch((e) => {
        res.send(e);
      });
  }
  if (minPrice || maxPrice) {
    return Product.find({
      "details.price": { $lte: maxPrice || 10000000000, $gte: minPrice || 0 },
    })
      .then((results) => {
        res.send(results);
      })
      .catch((e) => {
        res.send(e);
      });
  }
});

app.listen(5050, (err) => {
  if (err) return console.log(err);
  console.log("Server is up at port 5050");
});
