import express from 'express';
import { getProvinces } from '../controllers/general.controler.js';

const GeneralRouter = express.Router();

//provinces route
GeneralRouter.get('/provinces', getProvinces);

export default GeneralRouter
