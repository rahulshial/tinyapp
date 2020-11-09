const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (request, response) => {
  response.send("Hello!");
});

app.get("/urls.json", (request, response) => {
  response.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  // res.send("<html><body><h1>Hello <b>World</b></h1></body></html>\n");
  res.send("<html><body><h1>Hello <b>Rahul</b></h1></body></html>\n");
});

app.get("/set", (req, res) => {
  const a = 1;
  res.send(`a = ${a}`);
});
 
app.get("/fetch", (req, res) => {
  res.send(`a = ${a}`);
});
 
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
