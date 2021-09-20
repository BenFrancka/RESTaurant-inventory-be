import { Router } from 'express';
import Inventory from '../models/Inventory.js';

export default Router().post('/', async (req, res, next) => {
  try {
    const inventoryItem = await Inventory.insert(req.body);

    res.send(inventoryItem);
  } catch (error) {
    next(error);
  }
});
