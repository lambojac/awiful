import express from 'express';
import { createProject, getProjects } from '../controller/projectController';

const router = express.Router();

router.post('/', createProject);
router.get('/', getProjects);

export default router;