import Order from '../models/orders.model';
import OrdersSchema from '../schemas/orders.schema';

export const findAllOrders = async (filter: any) => {
  try {
    const orders: Order[] = await OrdersSchema.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: 'tickets',
          localField: 'tickets',
          foreignField: '_id',
          as: 'ticket',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'user',
        },
      },
    ]).exec();
    return orders;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const saveOrder = async (order: Order) => {
  try {
    const orderModel = new OrdersSchema<Order>({ ...order });
    const savedDoc = await orderModel.save();
    return savedDoc;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
