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
import { statusCode } from '../enum/index.js'

dotenv.config()

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