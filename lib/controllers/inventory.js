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
  })
  .get('/', async (req, res, next) => {
    try {
      const inventoryItems = await Inventory.getAll();

      res.send(inventoryItems);
    } catch (error) {
      next(error);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { itemName, category, itemPrice, totalItems, totalPrice } =
        req.body;
      const updatedInventoryItem = await Inventory.updateById(id, {
        itemName,
        category,
        itemPrice,
        totalItems,
        totalPrice,
      });

      res.send(updatedInventoryItem);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const inventoryItem = await Inventory.deleteById(id);

      res.send({
        message: `${inventoryItem.itemName} removed from inventory`,
      });
    } catch (error) {
      next(error);
    }
  });
