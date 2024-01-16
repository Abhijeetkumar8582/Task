import jwt from 'jsonwebtoken';

function checkApiKey(req, res, next) {
    const apiKey = req.get('Authorization');

    if (!apiKey) {
        return res.status(401).send('API Key is missing');
    }

    const serverApiKey = process.env.JWT_SECRET_KEY;

    jwt.verify(apiKey, serverApiKey, (err, decoded) => {
        if (err) {
            console.error('JWT Verification Error:', err);
            return res.status(401).send('Invalid API Key');
        }

        // Store the decoded information in the request object
        req.user = decoded;

        next();
    });
}

export default checkApiKey;
