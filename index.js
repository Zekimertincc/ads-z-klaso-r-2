const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { connectDb, collection } = require('./config/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDb();

app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

// Route definitions
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/acilandikey', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/acılandikey.html'));
});

app.get('/acilanyatay', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/acılanyatay.html'));
});

app.get('/benzerkelimeler', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/benzerkelimeler.html'));
});

app.get('/blokokuma', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/blokokuma.html'));
});

app.get('/buyuyend', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/büyüyendaire.html'));
});

app.get('/buyuyenk', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/büyüyenkare.html'));
});

app.get('/buyuyendi', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/büyüyendikdört.html'));
});

app.get('/hizliokuma', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/hızlıokuma.html'));
});

app.get('/kolonlar', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/kolonlar.html'));
});

app.get('/authpage', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/authpage.html'));
});

app.get('/profil', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/profil.html'));
});

// Register route
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const existingUser = await collection.findOne({ username });
        if (existingUser) {
            return res.status(400).send('This username is already taken.');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = { username, password: hashedPassword };
        await collection.create(newUser);

        res.status(201).send('User registered successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error during user registration.');
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Please provide both username and password.');
    }

    try {
        const user = await collection.findOne({ username });
        if (!user) {
            return res.status(401).send('Invalid username or password.');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid username or password.');
        }

        // Create session
        req.session.user = { id: user._id, username: user.username };
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error during login.');
    }
});

// Logout route
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out.');
        }
        res.redirect('/');
    });
});

// Check login status route
app.get('/status', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, username: req.session.user.username });
    } else {
        res.json({ loggedIn: false });
    }
});

// 404 Not Found route
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
