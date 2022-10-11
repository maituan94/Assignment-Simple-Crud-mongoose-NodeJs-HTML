import express from 'express';
import { getCustomers } from '../controllers/customer.controller.js';

const CustomerRouter = express.Router();

CustomerRouter.get('/customers', getCustomers);

export default CustomerRouter