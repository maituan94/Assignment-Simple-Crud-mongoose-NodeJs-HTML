import dotenv from 'dotenv'

dotenv.config();

/* Creating a constant variable called dbConfig that is an object with the properties user, password,
host, and database. The values of these properties are the values of the environment variables
MONGO_USER, MONGO_PASSWORD, MONGO_HOST, and MONGO_DATABASE. */
const dbConfig = {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    host: process.env.MONGO_HOST,
    database: process.env.MONGO_DATABASE
}
export default dbConfig
