import axios from "axios";
import request from "request";
import got from "got";
import http from "http";

const axiosFetchData = async () => {
  const { data } = await axios.get("https://cat-fact.herokuapp.com/facts");
  const catFacts = data.map((item) => item.text);
  console.log(catFacts);
};

// axiosFetchData();

const requestFetchData = () => {
  request("https://cat-fact.herokuapp.com/facts", (error, response, body) => {
    if (error) console.log(error);
    else {
      const data = JSON.parse(body);
      const catFacts = data.map((item) => item.text);
      console.log(catFacts);
    }
  });
};

// requestFetchData();

const gotFetchData = async () => {
  const { body } = await got.get("https://cat-fact.herokuapp.com/facts");
  const parsedData = JSON.parse(body);
  const catFacts = parsedData.map((item) => item.text);
  console.log(catFacts);
};

// gotFetchData();

const httpFetchData = () => {
  http.get("http://cat-fact.herokuapp.com/facts", (res) => {
    let data = "";
    res
      .on("data", function (chunk) {
        data += chunk;
      })
      .on("end", function () {
        const parsedData = JSON.parse(data);
        const catFacts = parsedData.map((item) => item.text);
        console.log(catFacts);
      })
      .on("error", function (e) {
        console.log(e.message);
      });
  });
};

httpFetchData();
