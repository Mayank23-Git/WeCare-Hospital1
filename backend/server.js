import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, isMongoConnected } from './config/db.js';
import departmentRoutes from './routes/departmentRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

export const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Connect to Database
connectDB();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'WeCare Hospital Healthcare API',
    database: isMongoConnected ? 'MongoDB (Connected)' : 'Fallback In-Memory Store (Active)',
    timestamp: new Date().toISOString()
  });
});

// Mount API routes
app.use('/api/departments', departmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler for unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' does not exist.`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[API Server Error]', err);
  res.status(500).json({
    success: false,
    message: 'An internal server error occurred',
    error: process.env.NODE_ENV === 'production' ? null : err.message
  });
});

const PORT = process.env.PORT || 5000;

// If started directly as standalone server
if (process.argv[1]?.endsWith('server.js') || process.env.RUN_STANDALONE) {
  app.listen(PORT, () => {
    console.log(`WeCare Hospital API Server running on port ${PORT}`);
  });
}

export default app;
