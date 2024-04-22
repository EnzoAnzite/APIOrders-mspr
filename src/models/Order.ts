import { Schema, model } from 'mongoose';
import IOrder from '../interfaces/OrderInterfaces';

const orderSchema = new Schema({
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    products: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
    }],
    status: { type: String, required: true, default: 'Pending' }
}, {
    timestamps: true
});

const Order = model<IOrder>('Order', orderSchema);

export default Order;
