const {
  generateRandomString,
  app,
  PORT,
  bodyParser
} = require('./constants');

const {urlDatabase} = require('./data');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});
app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL]};
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  res.redirect(urlDatabase[req.params.shortURL]);
});

//Add
app.post("/urls/:id", (req, res) => {
  console.log(req.params.id, req.body);
  urlDatabase[req.params.id] = req.body.longURL;
  res.redirect('/');
});

//Edited data received updated in database
app.post("/urls", (req, res) => {
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = req.body.longURL;
  // res.redirect(`/urls/${shortURL}`);
  res.redirect('/');
});

// Delete
app.post("/urls/:shortURL/delete", (req, res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect(`/`);
});

// Edit
app.post("/urls/:shortURL/edit", (req, res) => {
  res.redirect(`/urls/${req.params.shortURL}`);
});
  
app.listen(PORT, () => {
  console.log(`Server Started - TinyApp listening on port ${PORT}!`);
});
