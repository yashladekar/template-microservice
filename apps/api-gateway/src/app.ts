import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import pinoHttp from 'pino-http';
import logger from './utils/logger';
const app: Express = express();

// 1. Security Headers
app.use(helmet());

// =====================================================
// CRITICAL FOR PRODUCTION: Trust Proxy
// =====================================================
// If you deploy to AWS, Heroku, or use Nginx, the request comes 
// from the Load Balancer's IP, not the user's. 
// Without this, the rate limiter will block your Load Balancer 
// and shut down your entire API.
app.set('trust proxy', 1);

// 2. CORS (Configure specific origins in production)
// src/app.ts

// Define your allowed origins (Load these from .env in real production)
const allowedOrigins = [
    "http://localhost:3000", // Client App
    "http://localhost:3001", // Admin App
    "https://my-client-app.com",
    "https://admin.my-client-app.com"
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true, // Essential for Better Auth cookies
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// 2. Mount Better Auth Handler
// This handles all routes like /api/auth/sign-in, /api/auth/sign-up, etc.

// 3. Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Compression (Gzip)
app.use(compression());

// 5. HTTP Request Logging
app.use(pinoHttp({ logger }));
// 6. Routes (Example)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});

app.get('/', (req, res) => {
    res.send('Welcome to the Express.js Application!');
}
);
// 7. Error Handling (Must be last)

export default app;