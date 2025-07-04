import mongoose from "mongoose";


const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique: true,
    },


    //number of users involved in that project
    users:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
    }
    ]
})


const Project = mongoose.model('project',projectSchema);

export default Project;