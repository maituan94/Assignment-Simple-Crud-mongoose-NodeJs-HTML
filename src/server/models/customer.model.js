import mongoose from "mongoose";
import { genders, provinces } from "../enum/index.js";

const customerSchema = mongoose.Schema({
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
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
                return /.+\@.+\..+/.test(v);
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
    }
})

export default mongoose.model('customer', customerSchema, 'Customer')