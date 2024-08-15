import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, deletemanagement, getmanagements, updatemanagement } from "../controllers/management.controller.js";

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getmanagements', getmanagements);
router.delete('/deletemanagement/:managementId/:userId', verifyToken, deletemanagement);
router.put('/updatemanagement/:managementId/:userId', verifyToken, updatemanagement);

export default router;