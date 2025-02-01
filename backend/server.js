const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = 5000;
const SECRET_KEY = "secretKey"; 

app.use(express.json());
app.use(cors());

// Mock User Data
const users = {
    "user123": { id: "user123", name: "Luffy", password: "123456", email: "luffy@gmail.com" },
    "user02": { id: "user02", name: "Zoro", password: "123456", email: "zoro@gmail.com" }
};

// Mock Posts Data
const posts = [
    { id: 1, userId: "user123", title: "Post 1", content: "King Of Pirates", likes: 10 },
    { id: 2, userId: "user02", title: "Post 2", content: "World's Greatest Swordsman", likes: 20 },
];

const polls = {
    "poll1": {
        id: "poll1",
        question: "What is your favorite food?",
        options: ["Pizza", "Burger", "Sushi", "Pasta"],
        responses: [{ userId: "user123", option: "Pizza" }]
    }
};

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Unauthorized access!" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided!" });

    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        console.log("Decoded Token:", decodedToken);
        req.user = users[decodedToken.userId];

        if (!req.user) return res.status(404).json({ error: "User not found!" });
        next();
    } catch (error) {
        console.log("JWT Verification Error:", error.message);
        return res.status(403).json({ error: "Invalid Token!" });
    }
};

app.get("/api/user", authenticate, (req, res) => {
    res.json(req.user);
});

app.get("/api/posts/:userId", authenticate, (req, res) => {
    const userPosts = posts.filter(post => post.userId === req.params.userId);
    res.json(userPosts);
});

app.get("/api/polls/:pollId", authenticate, (req, res) => {
    const poll = polls[req.params.pollId];
    if (!poll) return res.status(404).json({ error: "Poll not found!" });

    const detailedResponses = poll.responses.map(resp => ({
        ...resp,
        userName: users[resp.userId]?.name || "Unknown"
    }));

    res.json({ ...poll, responses: detailedResponses });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
