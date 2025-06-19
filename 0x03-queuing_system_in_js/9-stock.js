// 9-stock.js
import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';

// Product list
const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 },
];

// Get product by ID
function getItemById(id) {
  return listProducts.find((item) => item.itemId === id);
}

// Redis client setup
const client = createClient();
client.on('error', (err) => console.error('Redis client not connected to the server:', err));
client.on('connect', () => console.log('Redis client connected to the server'));

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

// Reserve stock by item ID
async function reserveStockById(itemId, stock) {
  await setAsync(`item.${itemId}`, stock);
}

// Get current reserved stock by item ID
async function getCurrentReservedStockById(itemId) {
  const stock = await getAsync(`item.${itemId}`);
  return stock !== null ? parseInt(stock, 10) : null;
}

// Express app setup
const app = express();
const PORT = 1245;

// Route: GET /list_products
app.get('/list_products', (_req, res) => {
  res.json(listProducts);
});

// Route: GET /list_products/:itemId
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const item = getItemById(itemId);

  if (!item) {
    return res.json({ status: 'Product not found' });
  }

  const currentStock = await getCurrentReservedStockById(itemId);
  const quantity = currentStock !== null ? currentStock : item.initialAvailableQuantity;

  res.json({ ...item, currentQuantity: quantity });
});

// Route: GET /reserve_product/:itemId
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const item = getItemById(itemId);

  if (!item) {
    return res.json({ status: 'Product not found' });
  }

  const currentStock = await getCurrentReservedStockById(itemId);
  const stock = currentStock !== null ? currentStock : item.initialAvailableQuantity;

  if (stock <= 0) {
    return res.json({ status: 'Not enough stock available', itemId });
  }

  await reserveStockById(itemId, stock - 1);
  res.json({ status: 'Reservation confirmed', itemId });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

