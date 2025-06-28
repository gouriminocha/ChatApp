//it checks if user is logged in then it can access all other routes, otherwise unauthorized user

import jwt from "jsonwebtoken";


export const authUser = async(req, res, next)=>{
    try{
        const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];

        if(!token){
            return res.status(401).send({error: "Unauthorized User"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(error){
        console.log(error);
        res.status(401).send({error: 'Please authenticate'});
    }
}