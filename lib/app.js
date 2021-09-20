import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import inventoryController from './controllers/inventory.js';

const app = express();

app.use(express.json());

app.use('/api/v1/inventory', inventoryController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
