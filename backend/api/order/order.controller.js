const orderService = require('./order.service.js')
const logger = require('../../services/logger.service')
const { broadcast } = require('../../services/socket.service.js')

async function getOrders(req, res) {
  try {
    const queryParams = req.query
    const orders = await orderService.query(queryParams)
    res.json(orders)
  } catch (err) {
    res.status(404).send(err)
  }
}

async function getOrderById(req, res) {
  try {
    const orderId = req.params.id
    const order = await orderService.getById(orderId)
    res.json(order)
  } catch (err) {
    res.status(404).send(err)
  }
}

async function addOrder(req, res) {
  const order = req.body
  try {
    const addedOrder = await orderService.add(order)
    // broadcast({ type: 'order added', userId: req.session?.user._id })
    res.json(addedOrder)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function updateOrder(req, res) {
  try {
    const order = req.body
    const updatedOrder = await orderService.update(order)
    res.json(updatedOrder)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function removeOrder(req, res) {
  try {
    const orderId = req.params.id
    const removedId = await orderService.remove(orderId)
    res.send(removedId)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function addReview(req, res) {
  const orderId = req.params.id
  const review = req.body
  try {
    const addedReview = await orderService.addReview(review, orderId)
    res.send(addedReview)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  getOrders,
  getOrderById,
  addOrder,
  updateOrder,
  removeOrder,
  addReview,
}
