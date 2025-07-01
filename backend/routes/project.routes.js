import { Router } from "express";
import { body } from "express-validator";
import * as projectController from '../controllers/project.controller.js'
import * as authMiddleWare from '../middleware/auth.middleware.js'

const router = Router();


router.post('/create',
    authMiddleWare.authUser,
    body('name').isString().withMessage('Name is required'),
    projectController.createProject
)

//to get all projects of a particular user
router.get('/all',
    authMiddleWare.authUser,
    projectController.getAllProject
)



//to add a user to a particular project

router.put('/add-user',
    authMiddleWare.authUser,
    body('projectId').isString().withMessage('Project ID is required'),
    body('users').isArray({ min: 1 }).withMessage('Users must be an array of strings').bail()
        .custom((users) => users.every(user => typeof user === 'string')).withMessage('Each user must be a string'),
    projectController.addUserToProject
)


//to get info of a particular project
router.get('/get-project/:projectId',
    authMiddleWare.authUser,
    projectController.getProjectById
)
export default router;