import express from 'express';
import cors from 'cors';
import http from 'http';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';  // Import swagger-jsdoc
import studentRoutes from './routes/studentRoutes.js';
import registrarHeadRoutes from './routes/registrarHeadRoutes.js';
import departmentHeadRoutes from './routes/departmentHeadRoutes.js';
import adviserRoutes from './routes/adviserRoutes.js'
import authRoutes from './routes/authRoutes.js';
import programRoutes from './routes/programRoutes.js';
import courseRoutes from './routes/courseRoutes.js'
import coursePrerequisite from './routes/coursePrerequisiteRoutes.js'
import checklistRoutes from './routes/checklistRoutes.js'
import preEnrollmentRoutes from './routes/preEnrollmentRoutes.js';
import advisingRoutes from './routes/advisingRoutes.js'; 
// Create the express app
const app = express();

// Use CORS and enable JSON parsing
app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Enrollment System API',
      version: '1.0.0',
      description: 'API documentation for the Enrollment System',
    },
    servers: [
      {
        url: 'http://localhost:3000/',  // Adjust the URL to your API server
      },
    ],
  },
  apis: ['./src/routes/*.js'],  // Make sure this path is correct
};


// Initialize Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Serve Swagger API Docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Define routes
app.get('/', (req, res) => {
  res.send('EnrollmentSystem_Server');
});

app.use('/api/students', studentRoutes);
app.use('/api/departmentheads', departmentHeadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/registrarheads', registrarHeadRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/advisers', adviserRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/coursePrerequisite', coursePrerequisite);
app.use('/api/checklists', checklistRoutes);
app.use('/api/preenrollments', preEnrollmentRoutes);
app.use('/api/advisings', advisingRoutes); 


// Create the server instance
const server = http.createServer(app);

// Export the server instance for use in tests
export { server };
export default app;
