import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import {
    getAllCustomers,
    getCustomerById,
    createCustomer as createNewCustomer,
    updateCustomer as updateCustomerById,
    deleteCustomer as deleteCustomerById,
    findOneCustomer
} from "../models/customer.model.js"
import { userJsonReponse, userCreateUpdateJson } from '../helper/index.js'
import { statusCode, duplicatedCode } from '../enum/index.js'

dotenv.config()

/**
 * It gets all the customers from the database and returns them in a JSON response
 * @param req - The request object.
 * @param res - The response object.
 */
const getCustomers = (req, res) => {
    getAllCustomers((err, data) => {
        if (err) {
            console.log(err)
            res.status(statusCode.success).json({
                statusCode: statusCode.internalServerError,
                error: err
            })
            return
        }
        console.log(data)
        res.status(statusCode.success).json({
            statusCode: statusCode.success,
            data: data?.map(d => userJsonReponse(d)) || []
        })
    })
}

/**
 * It gets a customer by ID
 * @param req - The request object.
 * @param res - The response object.
 */
const getCustomerByID = (req, res) => {
    const id = req.params?.id
    if (!id) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid User Id' }
        })
        return
    }
    getCustomerById(id, (err, data) => {
        if (err) {
            console.log(err)
            res.status(statusCode.success).json({
                statusCode: statusCode.internalServerError,
                error: err
            })
            return
        }
        console.log(data)
        res.status(statusCode.success).json({
            statusCode: statusCode.success,
            data: userJsonReponse(data) || {}
        })
    })
}

/**
 * It creates a new customer
 * @param req - The request object.
 * @param res - The response object.
 */
const createCustomer = (req, res) => {
    const customer = req.body
    if (!customer) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid customer' }
        })
        return
    }

    createNewCustomer(userCreateUpdateJson(customer), (err, data) => {
        if (err) {
            console.log(err)
            if (err.code === duplicatedCode) {
                err = {...err, message: `${Object.keys(err.keyPattern)?.join(", ")} already existed`}
            }
            res.status(statusCode.success).json({
                statusCode: statusCode.badRequest,
                error: err
            })
            return
        }
        console.log(data)
        const secret = process.env.SECRET_JWT_TOKEN
        const expiresIn = process.env.TOKEN_EXPIRED_TIME
        let token = jwt.sign({ data: `${data._id}-${data.email}` }, secret, {
            expiresIn
        })
        res.status(statusCode.success).json({
            statusCode: statusCode.success,
            data: userJsonReponse(data) || {},
            token
        })
    })
}

/**
 * It updates a customer by id, if the customer is invalid, it returns a bad request, if the customer
 * is valid, it updates the customer and returns a success message
 * @param req - The request object.
 * @param res - The response object.
 */
const updateCustomer = (req, res) => {
    const { id } = req.params
    const customer = req.body

    if (!customer || !id) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid Customer' }
        })
        return
    }
    updateCustomerById(id, userCreateUpdateJson(customer), (err, data) => {
        if (err) {
            console.log(err)
            if (err.code === duplicatedCode) {
                err = {...err, message: `${Object.keys(err.keyPattern)?.join(", ")} already existed`}
            }
            res.status(statusCode.success).json({
                statusCode: statusCode.internalServerError,
                error: err
            })
            return
        }
        console.log(data)
        res.status(statusCode.success).json({
            statusCode: statusCode.success,
            message: 'Update customer successfully!',
            data: userJsonReponse(customer) || {}
        })
    })

}

/**
 * It deletes a customer from the database
 * @param req - The request object.
 * @param res - The response object.
 * @returns A function that takes in two parameters, req and res.
 */
const deleteCustomer = (req, res) => {
    const id = req.params?.id
    if (!id) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid User Id' }
        })
        return
    }

    deleteCustomerById(id, (err, data) => {
        if (err) {
            console.log(err)
            res.status(statusCode.success).json({
                statusCode: statusCode.internalServerError,
                error: err
            })
            return
        }
        console.log(data)
        res.status(statusCode.success).json({
            statusCode: statusCode.success,
            message: 'Delete the customer successfully!'
        })
    })
}

/**
 * It takes in a request and a response, and then it finds a customer by email and password, and if it
 * finds one, it creates a token and sends it back to the client
 * @param req - The request object.
 * @param res - The response object.
 */
const login = (req, res) => {
    const { email, password } = req.body

    findOneCustomer({ email, password }, (err, data) => {
        if (err) {
            console.log(err)
            res.status(statusCode.success).json({
                statusCode: statusCode.internalServerError,
                error: err
            })
            return
        }
        if (!data) {
            res.status(statusCode.success).json({
                statusCode: statusCode.notFound,
                message: 'Invalid Email or Password!'
            })
            return
        }
        const secret = process.env.SECRET_JWT_TOKEN
        const expiresIn = process.env.TOKEN_EXPIRED_TIME
        let token = jwt.sign({ data: `${data._id}-${data.email}` }, secret, {
            expiresIn
        })
        res.status(statusCode.success).json({
            statusCode: statusCode.success,
            data: userJsonReponse(data) || {},
            token: token || null
        })
    })
}


export {
    getCustomers,
    getCustomerByID,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    login
}
