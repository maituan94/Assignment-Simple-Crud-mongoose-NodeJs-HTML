import express from 'express';
import { getCustomers, createCustomer, login, getCustomerByID, updateCustomer, deleteCustomer } from '../controllers/customer.controller.js';
import { verifyToken } from '../middlewares/authJWT.js';

const CustomerRouter = express.Router();

//login
CustomerRouter.post('/customer/login', login)

//get customers
CustomerRouter.get('/customers', [verifyToken], getCustomers);

//create & update customer
CustomerRouter.post('/customer', createCustomer)
CustomerRouter.put('/customer/:id', [verifyToken], updateCustomer)

//get customer by Id and delete
CustomerRouter.get('/customer/:id', [verifyToken], getCustomerByID)
CustomerRouter.delete('/customer/:id', [verifyToken], deleteCustomer)

export default CustomerRouter
