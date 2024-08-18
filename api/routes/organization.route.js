import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, deleteorganization, getorganizations, updateorganization } from "../controllers/organization.controller.js";

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getorganizations', getorganizations);
router.delete('/deleteorganization/:organizationId/:userId', verifyToken, deleteorganization);
router.put('/updateorganization/:organizationId/:userId', verifyToken, updateorganization);

export default router;