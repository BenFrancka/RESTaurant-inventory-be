import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

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
});
