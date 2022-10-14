import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import CustomerModel from "../models/customer.model.js"
import { userJsonReponse, userCreateUpdateJson } from '../helper/index.js'

dotenv.config()

const getCustomers = (req, res) => {
    CustomerModel.find({}, function (err, data) {
        if (err) {
            console.log(err)
            res.status(200).json({
                statusCode: 500,
                error: err
            })
            return
        }
        console.log(data)
        res.status(200).json({
            statusCode: 200,
            data: data?.map(d => userJsonReponse(d)) || []
        })
    })
}

const getCustomerByID = (req, res) => {
    const id = req.params?.id
    if (!id) {
        res.status(200).json({
            statusCode: 401,
            error: { message: 'Invalid User Id' }
        })
        return
    }

    CustomerModel.findById(id, function (err, data) {
        if (err) {
            console.log(err)
            res.status(200).json({
                statusCode: 500,
                error: err
            })
            return
        }
        console.log(data)
        res.status(200).json({
            statusCode: 200,
            data: userJsonReponse(data) || {}
        })
    })
}

const createCustomer = (req, res) => {
    const customer = req.body
    if (!customer) {
        res.status(200).json({
            statusCode: 401,
            error: { message: 'Invalid question' }
        })
        return
    }

    CustomerModel.create(userCreateUpdateJson(customer), function (err, data) {
        if (err) {
            console.log(err)
            res.status(200).json({
                statusCode: 401,
                error: err
            })
            return
        } else {
            console.log(data)
            let token = jwt.sign({ data: `${data._id}-${data.email}` }, process.env.SECRET_JWT_TOKEN, {
                expiresIn: process.env.TOKEN_EXPIRED_TIME
            })
            res.status(200).json({
                statusCode: 200,
                data: userJsonReponse(data) || {},
                token
            })
        }
    })
}

const updateCustomer = (req, res) => {
    const customer = req.body

    if (!customer || !customer.id) {
        res.status(200).json({
            statusCode: 401,
            error: { message: 'Invalid Customer' }
        })
        return
    }
    CustomerModel.findByIdAndUpdate(customer.id, userCreateUpdateJson(customer), function (err, data) {
        if (err) {
            console.log(err)
            res.status(200).json({
                statusCode: 500,
                error: err
            })
            return
        }
        console.log(data)
        res.status(200).json({
            statusCode: 200,
            message: 'Update customer successfully!',
            data: userJsonReponse(customer) || {}
        })
    })

}

const deleteCustomer = (req, res) => {
    const id = req.params?.id
    if (!id) {
        res.status(200).json({
            statusCode: 401,
            error: { message: 'Invalid User Id' }
        })
        return
    }

    CustomerModel.findByIdAndDelete(id, function (err, data) {
        if(err) {
            console.log(err)
            res.status(200).json({
                statusCode: 500,
                error: err
            })
            return
        }
        console.log(data)
            res.status(200).json({
                statusCode: 200,
                message: 'Delete the customer successfully!'
            })
    })
}

const login = (req, res) => {
    const { email, password } = req.body

    CustomerModel.findOne({ email, password }, function (err, data) {
        if (err) {
            console.log(err)
            res.status(200).json({
                statusCode: 500,
                error: err
            })
            return
        } else {
            if (!data) {
                res.status(200).json({
                    statusCode: 404,
                    message: 'Invalid Email or Password!'
                })
                return
            }
            let token = jwt.sign({ data: `${data._id}-${data.email}` }, process.env.SECRET_JWT_TOKEN, {
                expiresIn: process.env.TOKEN_EXPIRED_TIME
            })
            res.status(200).json({
                statusCode: 200,
                data: userJsonReponse(data) || {},
                token: token || null
            })
        }
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