import express from "express";
import { Product } from "../ex17.1/app.js";

const app = express();

app.get("/products", async (req, res, next) => {
  if (Object.keys(req.query).length > 0) {
    next();
    return;
  }
  try {
    const results = await Product.find();
    res.send(results);
  } catch (e) {
    res.send(e);
  }
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.send(product);
  } catch (e) {
    res.send(e);
  }
});

app.get("/products", async (req, res) => {
  const { isActive, minPrice, maxPrice } = req.query;
  if (isActive === true || isActive === false) {
    try {
      const products = await Product.find({ isActive });
      return res.send(products);
    } catch (e) {
      return res.send(e);
    }
  }
  if (minPrice || maxPrice) {
    try {
      const products = await Product.find({
        "details.price": { $lte: maxPrice || 10000000000, $gte: minPrice || 0 },
      });
      return res.send(products);
    } catch (e) {
      return res.send(e);
    }
  }
});

app.listen(5050, (err) => {
  if (err) return console.log(err);
  console.log("Server is up at port 5050");
});
