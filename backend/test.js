const jwt = require('jsonwebtoken');
const secretKey = "secretKey"; 

const token = "PASTE_YOUR_TOKEN_HERE"; 

try {
    const decoded = jwt.verify(token, secretKey);
    console.log("Valid Token:", decoded);
} catch (err) {
    console.log("Invalid Token:", err.message);
}
