"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const database_1 = __importDefault(require("./config/database"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const swagger_1 = __importDefault(require("./swagger"));
const statCard_1 = __importDefault(require("./routes/statCard"));
const timelineRoutes_1 = __importDefault(require("./routes/timelineRoutes"));
const articleRoutes_1 = __importDefault(require("./routes/articleRoutes"));
const marketingRoutes_1 = __importDefault(require("./routes/marketingRoutes"));
const LatestActivity_1 = __importDefault(require("./routes/LatestActivity"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use('/api/users', userRoutes_1.default);
app.use('/api/project', projectRoutes_1.default);
app.use('/api/stat-card', statCard_1.default);
app.use("/api/timelines", timelineRoutes_1.default);
app.use("/api/articles", articleRoutes_1.default);
app.use("/api/marketing", marketingRoutes_1.default);
app.use("/api/latest-activity", LatestActivity_1.default);
(0, swagger_1.default)(app);
(0, database_1.default)();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map