import mongoose from "mongoose";
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


export const getAllProjectByUserId = async({userId} )=>{
    if(!userId){
        throw new Error('UserId is required')
    }


    //to get all projects in which this particular userId is present
    const allUserProjects = await projectModel.find({
        users: userId
    })

    return allUserProjects
}


export const addUserstoProject = async({projectId , users, userId}) =>{

    if(!projectId){
        throw new Error("Project Id is required")
    }

      if (!mongoose.Types.ObjectId.isValid(projectId)) { //if it is not the validate project Id as in mongoose
        throw new Error("Invalid projectId")
    }
    
    if(!users){
        throw new Error("Users are required")
    }

       if (!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))) {
        throw new Error("Invalid userId(s) in users array")
    }

    
    if(!userId){
        throw new Error("userId is required")
    }
      if (!mongoose.Types.ObjectId.isValid(userId)) {//if it is not the validate userId as in mongoose
        throw new Error("Invalid userId")
    }
    const  project = await projectModel.findOne({
        _id: projectId,
        users: userId   
    })

    ///to check that user that is trying to add new users is already in that project
    if(!project){
        throw new Error("User not belong to this project")
    }

    //find on the basis of projectId and add users
 const updatedProject = await projectModel.findOneAndUpdate({
        _id: projectId
    }, {
        $addToSet: {
            users: {
                $each: users
            }
        }
    }, {
        new: true
    })

    return updatedProject
}

export const getProjectById = async ({ projectId }) => {
    if (!projectId) {
        throw new Error("projectId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }

    const project = await projectModel.findOne({
        _id: projectId
    }).populate('users')

    return project;
}