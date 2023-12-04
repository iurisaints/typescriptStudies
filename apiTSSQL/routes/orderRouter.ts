import express, { Request, Response } from "express";
import * as orderModel from "../models/order";
import { Order, BasicOrder } from "../types/order";
const orderRouter = express.Router();

orderRouter.get("/", async (req: Request, res: Response) => {
  orderModel.findAll((err: Error, orders: Order[]) => {
    if (err) {
      return res.status(500).json({ "errorMessage": err.message });
    }

    res.status(200).json({ "data": orders });
  });
});

orderRouter.post("/", async (req: Request, res: Response) => {
  const newOrder: BasicOrder = req.body;
  orderModel.create(newOrder, (err: Error, orderId: number) => {
    if (err) {
      return res.status(500).json({ "message": err.message });
    }

    res.status(200).json({ "orderId": orderId });
  });
});

orderRouter.get("/:id", async (req: Request, res: Response) => {
  const orderId: number = Number(req.params.id);
  orderModel.findOne(orderId, (err: Error, order: Order) => {
    if (err) {
      return res.status(500).json({ "message": err.message });
    }
    res.status(200).json({ "data": order });
  });
});

orderRouter.put("/:id", async (req: Request, res: Response) => {
  const order: Order = req.body;
  orderModel.update(order, (err: Error) => {
    if (err) {
      return res.status(500).json({ "message": err.message });
    }

    res.status(200).send();
  });
});

export { orderRouter };