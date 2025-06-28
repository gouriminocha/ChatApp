//all logic of a particular endpoint

import userModel from '../models/user.model.js'
import * as userService from '../services/user.service.js'
import { validationResult } from 'express-validator'


export const createUserController = async (req, res) =>{
    //find errors throuhg express validator
    const errors = validationResult(req);

    //if errors is not empty, return errors
    if(!errors.isEmpty()){
        return res.status(400)
        .json({errors: errors.array()});
    }

    //create user
    try{
        const user = await userService.createUser(req.body);

        const token= await user.generateJWT();     //generateJWT method to generate token from user.model

        res.status(201).json({user, token});
    }catch(error){
        res.status(400).send(error.message);
    }
}