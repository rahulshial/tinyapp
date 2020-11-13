const {
  generateRandomString,
  getUserByEmail,
  getUrlsById,
  app,
  PORT,
  bodyParser,
  bcrypt,
  cookieSession,
} = require('./constants');

const {
  urlDatabase,
  users,
} = require('./data');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(cookieSession({
  name: 'session',
  keys: ['onekey']
}));

// If started at root, it redirects to /urls page
app.get("/", (req, res) => {
  res.redirect("/urls");
});

/**
 * the get /urls page lists out all the urls belonging to the user logged in. The user can click the EDIT button to change a shortURL's longURL, or DELETE button to delete the particular entry. The user can also create new tinyURL which will show up in his main list.
 * If user has not logged in, then a blank list page is generated, else the users email will be displayed on the top bar with a logout button.
 */
app.get("/urls", (req, res) => {
  const currUserId = req.session.userId;

  if (currUserId) {
    const usersURLs = getUrlsById(urlDatabase, currUserId);
    const templateVars = {
      urls: usersURLs,
      userId: currUserId,
      email: users[currUserId]['email'],
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

/**
 * When the logged in user clicks the Create New URL link, he / she is directed to the Create New URL page. The page accepts data in URL format only.
 */
app.get("/urls/new", (req, res) => {
  const currUserId = req.session.userId;
  if (!currUserId) {
    res.redirect("/login");
  } else {
    const templateVars = {
      urls: urlDatabase,
      userId: currUserId,
      email: users[currUserId]['email'],
    };
    res.render("urls_new", templateVars);
  }
});

/**
 * Logged in users can also traverse directly to a specific url by typing the shortURL in the address bar. This will take the user to the show url page where he / she can edit the longURL of the entry. User cannot access any other users shortURLs.
 */
app.get("/urls/:shortURL", (req, res) => {
  const currUserId = req.session.userId;
  const shortURL = req.params.shortURL;
  if (!currUserId) {
    res.redirect("/urls");
  } else if (urlDatabase[shortURL]) {
    const templateVars = {
      shortURL,
      longURL: urlDatabase[shortURL]['longURL'],
      userId: currUserId,
      urlUserId: urlDatabase[shortURL]['userID'],
      // user: users[currUserId],
      email: users[currUserId]['email'],
    };
    res.render("urls_show", templateVars);
  } else {
    res.status(404).send('Resource not found...Please check your input!');
  }
});

/**
 * whether logged in or not, if you know the shortURL, you can use the /u/:shortURL mode to directly execute the path to the longURL and visit the destination website.
 */
app.get("/u/:shortURL", (req, res) => {
  if (urlDatabase[req.params.shortURL]) {
    res.redirect(urlDatabase[req.params.shortURL]['longURL']);
  } else {
    res.status(404).send('Resource not found...Please check your input!');
  }
});

/**
 * REGISTRATION
 * Renders the Registration page
 */
app.get('/register', (req, res) => {
  const currUserId = req.session.userId;
  const templateVars = {
    userId: currUserId,
  };
  res.render("registration", templateVars);
});

/**
 * LOGIN
 * Renders the login page
 */
app.get('/login', (req, res) => {
  const currUserId = req.session.userId;
  const templateVars = {
    userId: currUserId,
  };
  res.render("login", templateVars);
});

/** LOGIN
 * A registered user can login to the app to Create, Read, Update or Delete his URL database. The login takes the users email address, and compates his password to the user database using the bcrypt module. If user is found, a session cookie is generated and the registered user is redirected to the /urls page to view his url list.
 */
app.post('/login', (req, res) => {
  const currEmail = req.body.email;
  const currPassword = req.body.password;
  if (!currEmail || !currPassword) {
    return res.status(400).send('Please enter a valid email/password');
  } else {
    const userInfo = getUserByEmail(users, currEmail);
    if (Object.keys(userInfo).length > 0 && bcrypt.compareSync(currPassword, userInfo.password)) {
      req.session.userId = userInfo['id'];
      res.redirect('/urls');
    } else {
      return res.status(403).send("User / password combination does not exist");
    }
  }
});

/** LOGOUT
 * all session cookies are removed and user is redirected to the /urls page to either login / register.
 */
app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/urls');
});

/**REGISTRATION
 * Valid email is required. Password is Hash Encrypted for security. Entry is checked to ensure that the email does not already exist in the database. Successful registration will create a
 */
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
  req.session.userId = userId;

  res.redirect('/urls');
});

// EDIT, ADD, DELETE +++++++

/**
 * Registered users can edit their entries and it is updated in the database.
 */
app.post("/urls/:id", (req, res) => {
  urlDatabase[req.params.id]['longURL'] = req.body.longURL;
  res.redirect('/');
});

/** ADD
 * when the user adds a new URL, the data is appended in the users URL database. A random id is generated for each new entry
 */
app.post("/urls", (req, res) => {

  const currUserId = req.session.userId;
  if (currUserId) {
    const shortURL = generateRandomString();
    urlDatabase[shortURL] = {longURL: req.body.longURL, userID: currUserId};
    res.redirect(`/urls/${shortURL}`);
  } else {
    res.status(401).send('UNAUTHORIZED ACCESS!!!');
  }
});

/**
 * When a user posts his edited URL, he is redirected to the /urls/:shortURL page
 */
app.post("/urls/:shortURL/edit", (req, res) => {
  res.redirect(`/urls/${req.params.shortURL}`);
});

/**
 * Registered Users can delete their own URL entries. But not anyone elses.
 */
app.post("/urls/:shortURL/delete", (req, res) => {
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
