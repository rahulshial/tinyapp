const {
  generateRandomString,
  app,
  PORT,
  bodyParser,
  cookieParser,
} = require('./constants');

const {urlDatabase} = require('./data');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    username: req.cookies['username'],
  };
  res.render("urls_index", templateVars);
});

app.get("/urls", (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    username: req.cookies['username'],
  };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const templateVars = {
    username: req.cookies['username'],
  };
  res.render("urls_new", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL],
    username: req.cookies['username']
  };
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
  
app.post('/login', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect(`/urls`);
});

// Logout
app.post('/logout', (req, res) => {
  res.clearCookie('username');
  res.redirect(`/urls`);
});

app.listen(PORT, () => {
  console.log(`Server Started - TinyApp listening on port ${PORT}!`);
});
