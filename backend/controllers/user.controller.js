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


export const loginController = async(req, res) =>{
    const errors = validationResult(req);

    //if errors is not empty, return errors
    if(!errors.isEmpty()){
        return res.status(400)
        .json({errors: errors.array()});
    }

    try{
        //check if user exists or not

        const {email, password} = req.body;

        const user = await userModel.findOne({email}).select('+password');

        //if user not found
        if(!user){
            res.status(401)
            .json({errors: 'Invalid credentials'})
        }

        const isMatch = await user.isValidPassword(password);

        //if password not match
        if(!isMatch){
            return res.status(401).arrayjson({
                errors: 'Invalid Credentials'
            })
        }

        const token= await user.generateJWT();

        res.status(200).json({user, token});

    }catch(err){
        res.status(400).send(err.message)
    }

}


export const profileController = async(req, res) =>{
    console.log(req.user);

    res.status(200).json({
        user: req.user
    })
}