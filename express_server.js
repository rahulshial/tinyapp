const {
  generateRandomString,
  getUserById,
  getUserByEmail,
  morgan,
  app,
  PORT,
  bodyParser,
  cookieParser,
} = require('./constants');

const {
  urlDatabase,
  users,
} = require('./data');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(morgan('dev'));

app.get("/", (req, res) => {
  const currUserId = req.cookies['userId'];

  const templateVars = {
    urls: urlDatabase,
    userId: currUserId,
    user: users[currUserId],
  };

  res.render("urls_index", templateVars);
});

app.get("/urls", (req, res) => {
  const currUserId = req.cookies['userId'];

  const templateVars = {
    urls: urlDatabase,
    userId: currUserId,
    user: users[currUserId],
  };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const currUserId = req.cookies['userId'];
  if (!currUserId) {
    res.redirect("/login");
  } else {
    const templateVars = {
      urls: urlDatabase,
      userId: currUserId,
      user: users[currUserId],
    };
    res.render("urls_new", templateVars);
  
  }
});

app.get("/urls/:shortURL", (req, res) => {
  const currUserId = req.cookies['userId'];
  if (!currUserId) {
    res.redirect("/login");
  } else {
    const templateVars = {
      shortURL: req.params.shortURL,
      longURL: urlDatabase[req.params.shortURL]['longURL'],
      userId: currUserId,
      user: users[currUserId],
    };
    res.render("urls_show", templateVars);
  }
});

app.get("/u/:shortURL", (req, res) => {
  res.redirect(urlDatabase[req.params.shortURL]['longURL']);
});

// Registration
app.get('/register', (req, res) => {
  const currUserId = req.cookies['userId'];

  const templateVars = {
    userId: currUserId,
  };

  res.render("registration", templateVars);
});

// Login
app.get('/login', (req, res) => {
  const currUserId = req.cookies['userId'];

  const templateVars = {
    userId: currUserId,
  };
  res.render("login", templateVars);
});

// EDIT, ADD, DELETE +++++++

//Add
app.post("/urls/:id", (req, res) => {
  urlDatabase[req.params.id]['longURL'] = req.body.longURL;
  res.redirect('/');
});

//Edited data received updated in database
app.post("/urls", (req, res) => {
  const currUserId = req.cookies['userId'];
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = {longURL: req.body.longURL, userID: currUserId};
  res.redirect(`/urls/${shortURL}`);
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
  const currEmail = req.body.email;
  const currPassword = req.body.password;
  if (!currEmail || !currPassword) {
    return res.status(400).send('Please enter a valid email/password');
  } else {
  // Lookup the user object in the users object using the user_id cookie value
    const userInfo = getUserByEmail(users, currEmail);
    if (Object.keys(userInfo).length > 0 && currPassword === userInfo['password']) {
      res.cookie('userId', userInfo['id']);
      res.redirect('/urls');
    } else {
      return res.status(403).send("User / password combination does not exist");
    }
  }
});

// Logout
app.post('/logout', (req, res) => {
  res.clearCookie('userId');
  res.redirect(`/urls`);
});

// Registration
app.post('/register', (req, res) => {
  const currEmail = req.body.email;
  const currPassword = req.body.password;
  if (!currEmail || !currPassword) {
    return res.status(400).send('Please enter a valid email/password');
  } else {
    const userInfo = getUserByEmail(users, currEmail);
    if (Object.keys(userInfo).length > 0) {
    // if (userInfo) {
      // res.clearCookie('userId');
      return res.status(302).send("User/password already exists..login instead!");
    }
  }
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
