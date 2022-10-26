import mongoose from "mongoose";
import { genders, provinces } from "../enum/index.js";

/* Defining the schema for the customer model. */
const customerSchema = mongoose.Schema({
    firstName: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[A-Za-z][A-Za-z0-9 ]+$/.test(v);
            },
            message: () => 'First Name must be more than 2 characters and not start with number or special characters'
        },
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[A-Za-z][A-Za-z0-9 ]+$/.test(v);
            },
            message: () => 'Last Name must be more than 2 characters and not start with number or special characters'
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
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)*$/.test(v);
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

/**
 * GetAllCustomers is a function that takes a callback as an argument and returns all customers from
 * the database.
 * @param callback - The callback function that will be called when the query is complete.
 */
export const getAllCustomers = (callback) => {
    if (typeof callback !== 'function') throw new Error('callback is not a function')
    customerModel.find({}, callback)
}

/**
 * GetCustomerById takes an id and a callback and returns a customer by id.
 * @param id - The id of the customer you want to get
 * @param callback - A function that will be called when the query is complete.
 */
export const getCustomerById = (id, callback) => {
    if (!id) throw new Error('Id is not defined')
    if (typeof callback !== 'function') throw new Error('callback is not a function')
    customerModel.findById(id, callback)
}

/**
 * It creates a customer in the database
 * @param data - The data to be inserted into the database.
 * @param callback - A function that will be called when the operation is complete.
 */
export const createCustomer = (data, callback) => {
    if (!data) throw new Error('Data is not defined')
    if (typeof callback !== 'function') throw new Error('callback is not a function')
    customerModel.create(data, callback)
}

/**
 * It updates a customer's data in the database
 * @param id - The id of the customer you want to update.
 * @param data - The data to be updated
 * @param callback - A callback function that will be called after the update is complete.
 */
export const updateCustomer = (id, data, callback) => {
    if (!data || !id) throw new Error(' Id or data is not defined')
    if (typeof callback !== 'function') throw new Error('callback is not a function')

    customerModel.findByIdAndUpdate(id, data, callback)
}

/**
 * It deletes a customer from the database by its id
 * @param id - The id of the customer to be deleted.
 * @param callback - A function that will be called when the operation is complete.
 */
export const deleteCustomer = (id, callback) => {
    if (!id) throw new Error(' Id is not defined')
    if (typeof callback !== 'function') throw new Error('callback is not a function')

    customerModel.findByIdAndDelete(id, callback)
}

/**
 * Find one customer in the database and return it to the callback function.
 * @param filter - This is the filter object that you want to use to find the customer.
 * @param callback - A function that will be called when the query is complete.
 */
export const findOneCustomer = (filter, callback) => {
    if (typeof callback !== 'function') throw new Error('callback is not a function')

    customerModel.findOne(filter, callback)
}
