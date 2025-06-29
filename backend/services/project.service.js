import projectModel from "../models/project.model.js";


export const createProject = async({
    name,userId
}) =>{

    if(!name){
        throw new Error('Name is Required')
    }
    if(!userId){
        throw new Error('User is Required')
    }

    let project;
    try{
    project = await projectModel.create({
        name, 
        users: [userId]
    })
    }catch(error){
        if(error.code=== 11000){
            throw new Error('Project name already exists')
        }
        throw error;
    }



    return project;
}