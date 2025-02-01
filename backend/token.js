const jwt = require('jsonwebtoken');

const SECRET_KEY = "secretKey"; 

const token = jwt.sign({ userId: "user123" }, SECRET_KEY, { expiresIn: "1h" });

console.log("Generated Token:", token);
