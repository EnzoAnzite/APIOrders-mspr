import { Request, Response } from 'express';
import Order from '../models/Order';
import axios from 'axios';

class OrderController {
    async createOrder(req: Request, res: Response) {
        try {
            const { customerId, products } = req.body;

            const customerResponse = await axios.get(`http://localhost:3002/api/customers/${customerId}`);
            if (!customerResponse.data) {
                return res.status(404).json({ message: 'Customer not found' });
            }

            for (const product of products) {
                const productResponse = await axios.get(`http://localhost:3001/api/products/${product.productId}`);
                if (!productResponse.data) {
                    return res.status(404).json({ message: `Product not found: ID ${product.productId}` });
                }
            }

            const order = new Order({
                customerId,
                products,
                status: 'Pending'
            });
            await order.save();
            res.status(201).json(order);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Ajouter d'autres méthodes pour manipuler les commandes...
}

export default new OrderController();
