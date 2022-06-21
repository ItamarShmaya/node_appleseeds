import express from "express";
import dot from "dot-object";
import { Product } from "../ex17.1/app.js";
import { productJoiSchema } from "./joi.product.schema.js";
import { ObjectId } from "mongodb";

const app = express();
app.use(express.json());

app.patch("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const value = await productJoiSchema.validateAsync(req.body);
    const dottedObj = dot.dot(value);
    const updatedProduct = await Product.findByIdAndUpdate(id, dottedObj, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) return res.status(404).send();
    res.send(updatedProduct);
  } catch (e) {
    res.send(e);
  }
});

app.delete("/products", async (req, res) => {
  try {
    const deletedCount = await Product.deleteMany();
    res.send(deletedCount);
  } catch (e) {
    res.status(e);
  }
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCount = await Product.deleteOne({ _id: new ObjectId(id) });
    res.send(deletedCount);
  } catch (e) {
    res.status(e);
  }
});

app.listen(5050, (err) => {
  if (err) return console.log(err);
  console.log("Server is up at port 5050");
});
