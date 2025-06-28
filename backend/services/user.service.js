import userModel from '../models/user.model.js'

export const createUser = async({
    email,password
}) =>{

    //if email or password not found send error
    if(!email || !password){
        throw new Error("Email and password are required");
    }


     //if email and password found, then create a user
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userModel.create({
        email,
        password: hashedPassword
    });

    return user;
}