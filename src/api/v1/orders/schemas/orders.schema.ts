import { model, Schema } from 'mongoose';
import Order from '../models/orders.model';

const orders = new Schema<Order>(
  {
    owner: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    tickets: { type: Schema.Types.ObjectId, required: true, ref: 'tickets' },
    date: { type: Date, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

const OrdersSchema = model('orders', orders);

export default OrdersSchema;
