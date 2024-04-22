import { Schema } from 'mongoose';

export default interface IOrder extends Document {
    customerId: Schema.Types.ObjectId;
    products: [{
        productId: Schema.Types.ObjectId,
        quantity: number,
    }];
    status: string;
    createdAt: Date;
    updatedAt: Date;
}