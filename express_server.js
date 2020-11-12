const {
  generateRandomString,
  getUserByEmail,
  getUrlsById,
  morgan,
  app,
  PORT,
  bodyParser,
  cookieParser,
  bcrypt,
  cookieSession,
} = require('./constants');

const {
  urlDatabase,
  users,
} = require('./data');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(morgan('dev'));
app.use(cookieSession({
  name: 'session',
  keys: ['onekey']
}));

// default start at main page
app.get("/", (req, res) => {
  res.redirect("/urls");
});

app.get("/urls", (req, res) => {
  // const currUserId = req.cookies['userId'];
  const currUserId = req.session.userId;

  if (currUserId) {
    const usersURLs = getUrlsById(urlDatabase, currUserId);
    const templateVars = {
      urls: usersURLs,
      userId: currUserId,
      user: users[currUserId],
    };
    res.render("urls_index", templateVars);
  } else {
    const templateVars = {
      urls: {},
      userId: '',
      user: '',
    };
    res.render("urls_index", templateVars);
  }
});

app.get("/urls/new", (req, res) => {
  // const currUserId = req.cookies['userId'];
  const currUserId = req.session.userId;
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
  // const currUserId = req.cookies['userId'];
  const currUserId = req.session.userId;
  const shortURL = req.params.shortURL;
  if (!currUserId) {
    res.redirect("/urls");
  } else {
    const templateVars = {
      shortURL,
      longURL: urlDatabase[shortURL]['longURL'],
      userId: currUserId,
      urlUserId: urlDatabase[shortURL]['userID'],
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
  // const currUserId = req.cookies['userId'];
  const currUserId = req.session.userId;

  const templateVars = {
    userId: currUserId,
  };

  res.render("registration", templateVars);
});

// Login
app.get('/login', (req, res) => {
  // const currUserId = req.cookies['userId'];
  const currUserId = req.session.userId;

  const templateVars = {
    userId: currUserId,
  };
  res.render("login", templateVars);
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
    if (Object.keys(userInfo).length > 0 && bcrypt.compareSync(currPassword, userInfo.password)) {
      // res.userId = ('userId', userInfo['id']);
      req.session.userId = userInfo['id'];
      res.redirect('/urls');
    } else {
      return res.status(403).send("User / password combination does not exist");
    }
  }
});

// Logout
app.post('/logout', (req, res) => {
  // res.clearCookie('userId');
  req.session = null;
  res.redirect('/urls');
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
      return res.status(302).send("User/password already exists..login instead!");
    }
  }
  const userId = generateRandomString();
  users[userId] = {
    id: userId,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  };
  // res.cookie('userId', userId);
  req.session.userId = userId;

  res.redirect('/urls');
});

// EDIT, ADD, DELETE +++++++

//ADD
app.post("/urls/:id", (req, res) => {
  urlDatabase[req.params.id]['longURL'] = req.body.longURL;
  res.redirect('/');
});

//EDIT data received updated in database
app.post("/urls", (req, res) => {
  // const currUserId = req.cookies['userId'];
  const currUserId = req.session.userId;
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = {longURL: req.body.longURL, userID: currUserId};
  res.redirect(`/urls/${shortURL}`);
});

// Edit
app.post("/urls/:shortURL/edit", (req, res) => {
  res.redirect(`/urls/${req.params.shortURL}`);
});

// DELETE
app.post("/urls/:shortURL/delete", (req, res) => {
  // const currUserId = req.cookies['userId'];
  const currUserId = req.session.userId;
  const shortURL = req.params.shortURL;
  const urlUserId = urlDatabase[shortURL]['userID'];
  if (urlUserId === currUserId) {
    delete urlDatabase[req.params.shortURL];
    res.redirect(`/`);
  } else {
    return res.status(401).send('UNAUTHORIZED ACCESS!!!');
  }
});

app.listen(PORT, () => {
  console.log(`Server Started - TinyApp listening on port ${PORT}!`);
});
