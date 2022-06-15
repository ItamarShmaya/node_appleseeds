import express from "express";

const numbers = [1, 2, 3, 4, 5, 6];

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/numbers", (req, res) => {
  res.send(JSON.stringify(numbers));
});

app.post("/numbers", (req, res) => {
  const { number } = req.body;
  if (numbers.every((num) => num !== +number)) {
    numbers.push(+number);
    return res.send(numbers);
  } else {
    res.status(400);
    return res.send("number already exist");
  }
});

app.put("/numbers/:numId", (req, res) => {
  const { numId } = req.params;
  const { number } = req.body;
  const numIndex = numbers.findIndex((num) => num === +numId);
  const isNumberExist = numbers.some((num) => num === +number);
  if (numIndex === -1) {
    res.status(400);
    return res.send("The number you looking for doesn't exist");
  }

  if (isNumberExist) {
    res.status(400);
    return res.send("The value you're trying to update already exist");
  }

  numbers[numIndex] = +number;
  return res.send(JSON.stringify(numbers));
});

app.delete("/numbers/:numId", (req, res) => {
  const { numId } = req.params;
  const numIndex = numbers.findIndex((num) => num === +numId);
  if (numIndex !== -1) {
    numbers.splice(numIndex, 1);
    return res.send(JSON.stringify(numbers));
  } else {
    res.status(400);
    return res.send("Number doesn't exist");
  }
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
