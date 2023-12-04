"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.findAll = exports.findOne = exports.create = void 0;
const db_1 = require("../dist/db");
const create = (order, callback) => {
    const queryString = "INSERT INTO ProductOrder (product_id, customer_id, product_quantity) VALUES (?, ?, ?)";
    db_1.db.query(queryString, [order.product.id, order.customer.id, order.productQuantity], (err, result) => {
        if (err) {
            callback(err);
        }
        ;
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const findOne = (orderId, callback) => {
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
    db_1.db.query(queryString, orderId, (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        const order = {
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
exports.findOne = findOne;
const findAll = (callback) => {
    const queryString = `
      SELECT 
        o.*, 
        p.*,
        c.name AS customer_name,
        c.email
      FROM ProductOrder AS o 
      INNER JOIN Customer AS c ON c.id=o.customer_id
      INNER JOIN Product AS p ON p.id=o.product_id`;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const orders = [];
        rows.forEach(row => {
            const order = {
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
exports.findAll = findAll;
const update = (order, callback) => {
    const queryString = `UPDATE ProductOrder SET product_id=?, product_quantity=? WHERE order_id=?`;
    db_1.db.query(queryString, [order.product.id, order.productQuantity, order.orderId], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.update = update;
