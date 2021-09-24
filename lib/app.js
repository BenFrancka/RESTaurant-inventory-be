import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import inventoryController from './controllers/inventory.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use('/api/v1/inventory', inventoryController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
