import express, { Application,Request, Response } from 'express';
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
import getProjectAnalytics from './routes/projectAnalytics';
import revenue from "./routes/revenue"
import estimate from "./routes/customerEstimate"
import stripeRoutes from './routes/stripe';
import projectTimeline from "./routes/projectTimeline"
import website from "./routes/website"
const app: Application = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use('/webhook', express.raw({ type: 'application/json' }), stripeRoutes);
// Routes
app.use('/api/users', userRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/stat-card',statCard)
app.use("/api/timelines", timelineRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/marketing",marketing)
app.use("/api/latest-activity",LatestActivity)
app.use("/api/dashboard",dashboard)
app.use("/api",getProjectAnalytics)
app.use("/api/revenue",revenue)
app.use("/api/estimate",estimate)
app.use("/api/project-timeline",projectTimeline)
app.use("/api/",website)
app.use('/api/stripe', stripeRoutes);
// Swagger
setupSwagger(app as any);

// Database connection
connectDB();
//wild card checking if the requested route exist

app.use('*', async (_req : Request , res : Response) => {
  return res.status(404).json({message:" route not found"})
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;