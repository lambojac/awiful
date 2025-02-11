import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/database';
import userRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes';
import setupSwagger from './swagger';
import statCard from "./routes/statCard"
import timelineRoutes from "./routes/timelineRoutes"
import articleRoutes from "./routes/articleRoutes"
import marketing from "./routes/marketingRoutes"
import LatestActivity from './routes/LatestActivity';
import dashboard from "./routes/dashboard"
const app: Application = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/stat-card',statCard)
app.use("/api/timelines", timelineRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/marketing",marketing)
app.use("/api/latest-activity",LatestActivity)
app.use("/api/dashboard",dashboard)
// Swagger
setupSwagger(app as any);

// Database connection
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;