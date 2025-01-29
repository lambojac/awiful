"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjects = exports.createProject = void 0;
const projectManagement_1 = __importDefault(require("../models/projectManagement"));
const createProject = async (req, res) => {
    try {
        const project = await projectManagement_1.default.create(req.body);
        res.status(201).json(project);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating project' });
    }
};
exports.createProject = createProject;
const getProjects = async (_req, res) => {
    try {
        const projects = await projectManagement_1.default.find();
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching projects' });
    }
};
exports.getProjects = getProjects;
//# sourceMappingURL=projectController.js.map