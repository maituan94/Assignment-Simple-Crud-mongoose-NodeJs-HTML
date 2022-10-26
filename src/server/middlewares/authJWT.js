import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { statusCode } from '../enum/index.js'

dotenv.config()

/**
 * It takes a token from the request header, verifies it against the secret key, and if it's valid, it
 * adds the decoded token to the request object
 * @param req - The request object.
 * @param res - The response object.
 * @param next - This is a callback function that will be called when the middleware is done.
 */
const verifyToken = (req, res, next) => {
    let token = req.headers["authorization"]
    const secret = process.env.SECRET_JWT_TOKEN
    
    if (!token) {
        res.status(statusCode.success).json({
            statusCode: statusCode.unauthorized,
            error: { message: "No token provided!" }
        });
        return
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            console.log(err)
            res.status(statusCode.success).json({
                statusCode: statusCode.unauthorized,
                error: { message: "Unauthorized" }
            });
            return
        }
        req.user = decoded.data;
        next();
    });
}

export {
    verifyToken
}
