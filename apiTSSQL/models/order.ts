import { BasicOrder, Order, OrderWithDetails } from "../types/order";
import { db } from "../dist/db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (order: BasicOrder, callback: Function) => {
  const queryString = "INSERT INTO ProductOrder (product_id, customer_id, product_quantity) VALUES (?, ?, ?)";

  db.query(
    queryString,
    [order.product.id, order.customer.id, order.productQuantity],
    (err, result) => {
      if (err) { callback(err) };

      const insertId = (<OkPacket>result).insertId;
      callback(null, insertId);
    }
  );
};

export const findOne = (orderId: number, callback: Function) => {
    const queryString = `
      SELECT 
        o.*,
        p.*,
        c.name AS customer_name,
        c.email
      FROM ProductOrder AS o
      INNER JOIN Customer AS c ON c.id=o.customer_id
      INNER JOIN Product AS p ON p.id=o.product_id
      WHERE o.order_id=?`;
  
    db.query(queryString, orderId, (err, result) => {
      if (err) { callback(err) }
  
      const row = (<RowDataPacket>result)[0];
      const order: OrderWithDetails = {
        orderId: row.order_id,
        customer: {
          id: row.cusomer_id,
          name: row.customer_name,
          email: row.email
        },
        product: {
          id: row.product_id,
          name: row.name,
          description: row.description,
          instockQuantity: row.instock_quantity,
          price: row.price
        },
        productQuantity: row.product_quantity
      };
      callback(null, order);
    });
  };

  export const findAll = (callback: Function) => {
    const queryString = `
      SELECT 
        o.*, 
        p.*,
        c.name AS customer_name,
        c.email
      FROM ProductOrder AS o 
      INNER JOIN Customer AS c ON c.id=o.customer_id
      INNER JOIN Product AS p ON p.id=o.product_id`;
  
    db.query(queryString, (err, result) => {
      if (err) { callback(err) }
  
      const rows = <RowDataPacket[]>result;
      const orders: Order[] = [];
  
      rows.forEach(row => {
        const order: OrderWithDetails = {
          orderId: row.order_id,
          customer: {
            id: row.customer_id,
            name: row.customer_name,
            email: row.email
          },
          product: {
            id: row.product_id,
            name: row.name,
            description: row.description,
            instockQuantity: row.instock_quantity,
            price: row.price
          },
          productQuantity: row.product_quantity
        };
        orders.push(order);
      });
      callback(null, orders);
    });
  };
  
  export const update = (order: Order, callback: Function) => {
    const queryString = `UPDATE ProductOrder SET product_id=?, product_quantity=? WHERE order_id=?`;
  
    db.query(
      queryString,
      [order.product.id, order.productQuantity, order.orderId],
      (err, result) => {
        if (err) { callback(err) }
        callback(null);
      }
    );
  };