import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/numbers", (req, res) => {
  res.send("Success using GET method");
});

app.post("/numbers", (req, res) => {
  res.send("Succes using POST method");
});

app.put("/numbers", (req, res) => {
  res.send("Succes using PUT method");
});

app.delete("/numbers", (req, res) => {
  res.send("Succes using DELETE method");
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
