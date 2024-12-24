import { Router} from "express";
const router = Router();

import{getAlljobs,
    createJob,
    singleJob,
    editJob,
    deleteJob,
showStats} from "../controller/jobController.js"

    import { validateJobInput,validateIdParam } from "../middleware/validationMiddleware.js";
    import { checkForTestUser } from "../middleware/authMiddleware.js";



    // router.get('/', getAllJobs);
// router.post('/', createJob);

router.route('/').get(getAlljobs).post(checkForTestUser,validateJobInput,createJob);
router.route('/stats').get(showStats);
router.route('/:id').get(validateIdParam,singleJob)
.patch(checkForTestUser,validateIdParam,validateJobInput,editJob)
.delete(checkForTestUser,validateIdParam,deleteJob);

export default router;