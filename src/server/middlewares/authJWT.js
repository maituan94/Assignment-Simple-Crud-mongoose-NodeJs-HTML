import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { statusCode } from '../enum/index.js'

dotenv.config()

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
};