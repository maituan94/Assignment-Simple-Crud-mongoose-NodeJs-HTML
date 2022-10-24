import mongoose from "mongoose";
import { genders, provinces } from "../enum/index.js";

/* Defining the schema for the customer model. */
const customerSchema = mongoose.Schema({
    firstName: {
        type: String,
        validate: {
            validator: function (v) {
                return v.length > 2;
            },
            message: () => 'First Name must be more than 2 characters'
        },
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        validate: {
            validator: function (v) {
                return v.length > 2;
            },
            message: () => 'Last Name must be more than 2 characters'
        },
        required: [true, 'Last name is required']
    },
    gender: { type: String, enum: genders, required: true },
    phone: {
        type: String, validate: {
            validator: function (v) {
                return /^\+[0-9]{1,3}\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number`
        },
        required: [true, 'User phone number required'],
        unique: true
    },
    email: {
        type: String, validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email`
        },
        required: true,
        unique: true
    },
    homeNumber: {
        type: String
    },
    address: {
        type: String
    },

    state: {
        type: String,
        enum: Object.keys(provinces),
        default: 'ON'
    },
    password: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/.test(v)
            },
            message: () => `Password is not valid!`
        },
        required: [true, 'Password is required']
    },
    isSendNews: {
        type: Boolean,
        default: false
    },
    question: {
        type: String
    },
    dateOfBirth: {
        type: Date
    }
})

const customerModel = mongoose.model('customer', customerSchema, 'Customer')

export const getAllCustomers = (callback) => {
    if (typeof callback !== 'function') throw new Error('callback is not a function')
    customerModel.find({}, callback)
}

export const getCustomerById = (id, callback) => {
    if (!id) throw new Error('Id is not defined')
    if (typeof callback !== 'function') throw new Error('callback is not a function')
    customerModel.findById(id, callback)
}

export const createCustomer = (data, callback) => {
    if (!data) throw new Error('Data is not defined')
    if (typeof callback !== 'function') throw new Error('callback is not a function')
    customerModel.create(data, callback)
}

export const updateCustomer = (id, data, callback) => {
    if (!data || !id) throw new Error(' Id or data is not defined')
    if (typeof callback !== 'function') throw new Error('callback is not a function')

    customerModel.findByIdAndUpdate(id, data, callback)
}

export const deleteCustomer = (id, callback) => {
    if (!id) throw new Error(' Id is not defined')
    if (typeof callback !== 'function') throw new Error('callback is not a function')

    customerModel.findByIdAndDelete(id, callback)
}

export const findOneCustomer = (filter, callback) => {
    if (typeof callback !== 'function') throw new Error('callback is not a function')

    customerModel.findOne(filter, callback)
}
