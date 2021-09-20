import pool from '../utils/pool';

export default class Inventory {
  id;
  itemName;
  category;
  itemPrice;
  totalItems;
  totalPrice;

  constructor(row) {
    this.id = row.id;
    this.itemName = row.item_name;
    this.category = row.category;
    this.itemPrice = row.item_price;
    this.totalItems = row.total_items;
    this.totalPrice = row.total_price;
  }

  static async insert({
    itemName,
    category,
    itemPrice,
    totalItems,
    totalPrice,
  }) {
    const { rows } = await pool.query(
      `
         INSERT INTO inventory 
         (item_name, category, item_price, total_items, total_price)
         VALUES
         ($1, $2, $3, $4, $5)
         RETURNING *
        `,
      [itemName, category, itemPrice, totalItems, totalPrice]
    );

    return new Inventory(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * from inventory
        WHERE id=$1`,
      [id]
    );

    return new Inventory(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from inventory');

    return rows.map((row) => new Inventory(row));
  }

  static async updateById(
    id,
    { itemName, category, itemPrice, totalItems, totalPrice }
  ) {
    const existingItem = await Inventory.getById(id);
    const newItemName = itemName ?? existingItem.itemName;
    const newCategory = category ?? existingItem.category;
    const newItemPrice = itemPrice ?? existingItem.itemPrice;
    const newTotalItems = totalItems ?? existingItem.totalItems;
    const newTotalPrice = totalPrice ?? existingItem.totalPrice;

    const { rows } = await pool.query(
      `
       UPDATE inventory
       SET 
       item_name=$1,
       category=$2,
       item_price=$3,
       total_items=$4,
       total_price=$5
       WHERE id=$6
       RETURNING *
      `,
      [newItemName, newCategory, newItemPrice, newTotalItems, newTotalPrice, id]
    );

    return new Inventory(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
       DELETE from inventory
       WHERE id=$1
       RETURNING *
      `,
      [id]
    );

    return new Inventory(rows[0]);
  }
}
