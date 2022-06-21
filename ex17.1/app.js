import mongoose from "mongoose";
import validator from "validator";

mongoose.connect("mongodb://127.0.0.1:27017/e-commerce-site");

export const Product = mongoose.model("Product", {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
  },
  details: {
    description: {
      type: String,
      required: true,
      minLinegth: 10,
    },
    price: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0) throw new Error("Price must be a positive number");
      },
    },
    discount: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      minLength: 2,
    },
    phoneNumber: {
      type: String,
      validate(value) {
        if (!validator.isMobilePhone(value, "he-IL"))
          throw new Error("Invalid phone number");
      },
    },
    DateAdded: {
      type: Date,
      default: new Date(),
    },
  },
});

const newProduct1 = new Product({
  name: "Table",
  category: "Furniture",
  isActive: true,
  details: {
    description: "Aweosme wooden table",
    price: 500,
    discount: 10,
    phoneNumber: "0525548752",
    dateAdded: new Date(),
  },
});

const newProduct2 = new Product({
  name: "Headset",
  category: "Gaming",
  isActive: true,
  details: {
    description: "Aweosme plastic headset",
    price: 300,
  },
});

const newProduct3 = new Product({
  name: "Soccer Ball",
  category: "Sports",
  isActive: true,
  details: {
    description: "Aweosme Soccer Ball",
    price: 20,
    phoneNumber: "0545548752",
  },
});

// newProduct
//   .save()
//   .then(() => console.log(newProduct))
//   .catch((e) => console.log(e));

// Product.create(newProduct1, newProduct2, newProduct3);
// Product.collection.insertMany([newProduct1, newProduct2, newProduct3]);
