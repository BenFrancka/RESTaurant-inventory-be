import { Router } from 'express';
import Inventory from '../models/Inventory.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const inventoryItem = await Inventory.insert(req.body);

      res.send(inventoryItem);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const inventoryItem = await Inventory.getById(id);

      res.send(inventoryItem);
    } catch (error) {
      next(error);
    }
  });
