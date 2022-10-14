import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const verifyToken = (req, res, next) => {
    let token = req.headers["authorization"]

    if (!token) {
        res.status(200).json({
            statusCode: 401,
            error: { message: "No token provided!" }
        });
        return
    }
    jwt.verify(token, process.env.SECRET_JWT_TOKEN, (err, decoded) => {
        if (err) {
            console.log(err)
            res.status(200).json({
                statusCode: 401,
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