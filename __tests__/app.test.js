import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Inventory from '../lib/models/Inventory.js';

describe('inventory rouotes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates an inventory item using POST', async () => {
    const potatoes = {
      itemName: 'potatoes',
      category: 'produce',
      itemPrice: 7,
      totalItems: 3,
      totalPrice: 21,
    };
    const res = await request(app).post('/api/v1/inventory').send(potatoes);

    expect(res.body).toEqual({
      id: '1',
      ...potatoes,
    });
  });

  it('gets an inventory item by id using GET', async () => {
    const potatoes = await Inventory.insert({
      itemName: 'potatoes',
      category: 'produce',
      itemPrice: 7,
      totalItems: 3,
      totalPrice: 21,
    });
    const res = await request(app).get(`/api/v1/inventory/${potatoes.id}`);

    expect(res.body).toEqual(potatoes);
  });
});
