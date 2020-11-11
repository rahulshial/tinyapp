const {
  generateRandomString,
  app,
  PORT,
  bodyParser,
  cookieParser,
  getUser,
} = require('./constants');

const {
  urlDatabase,
  users,
} = require('./data');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const currUserId = req.cookies['userId'];

  const templateVars = {
    urls: urlDatabase,
    userId: currUserId,
    user: users[currUserId],
  };  res.render("urls_index", templateVars);
});

app.get("/urls", (req, res) => {
  const currUserId = req.cookies['userId'];

  const templateVars = {
    urls: urlDatabase,
    userId: currUserId,
    user: users[currUserId],
  };
  // console.log(templateVars.user[newUserid]);
  // console.log(templateVars.user['email']);
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const currUserId = req.cookies['userId'];

  const templateVars = {
    userId: currUserId,
    users: users[currUserId],
  };
  res.render("urls_new", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  const currUserId = req.cookies['userId'];

  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL],
    userId: currUserId,
    users: users[currUserId],
  };
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  res.redirect(urlDatabase[req.params.shortURL]);
});


//Add
app.post("/urls/:id", (req, res) => {
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

// Login
app.post('/login', (req, res) => {
  const loginId = req.body.userId;
  res.cookie('userId', loginId);

  // Lookup the user object in the users object using the user_id cookie value
  const userInfo = getUser(users, loginId);
  if (Object.keys(userInfo).length === 0) {
    res.clearCookie('userId');
    res.redirect(`/urls`);
  } else {
    res.locals.userInfo = userInfo;
    // console.log(res.locals.userInfo);
    res.redirect(`/urls`);
  }
});

// Logout
app.post('/logout', (req, res) => {
  res.clearCookie('userId');
  res.redirect(`/urls`);
});

// Registration
app.get('/register', (req, res) => {
  const currUserId = req.cookies['userId'];

  const templateVars = {
    userId: currUserId,
  };
  res.render("registration", templateVars);
});

app.post('/register', (req, res) => {
  const userId = generateRandomString();
  users[userId] = {
    id: userId,
    email: req.body.email,
    password: req.body.password
  };
  res.cookie('userId', userId);
  res.redirect('/urls');
});

app.listen(PORT, () => {
  console.log(`Server Started - TinyApp listening on port ${PORT}!`);
});
