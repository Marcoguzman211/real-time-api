import express from 'express'
import Order from '../models/order'
import {io} from '../index' 
import '../config/db'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
    res.send(orders)
  } catch (error) {
    res.send(error)
  }
})

router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body)
    console.log(req.body)
    await order.save()
    const orders = await Order.find()
    io.emmit('order-added', orders)
    res.status(201).send(order)
  } catch (error) {
    res.send(error)
  }
})

export default router