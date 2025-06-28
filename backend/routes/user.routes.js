import { Router } from "express";
import * as userController from '../controllers/user.controller.js'//import all as userController from user.controller.js
import {body} from 'express-validator';

const router = Router();

router.post('/register', 
    //two data required while post request(register)
    body('email').isEmail().withMessage("Email must be a valid email address"),
    body('password').isLength({min: 3}).withMessage("Password must be atleast 3 characters long "),
    
    userController.createUserController)


export default router;