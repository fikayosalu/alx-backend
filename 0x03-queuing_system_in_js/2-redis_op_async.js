// 2-redis_op_async.js
import redis from 'redis';
import { promisify } from 'util';

// Create Redis client
const client = redis.createClient();

// Log connection success
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Log connection error
client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.message);
});

// Function to set a value (still using callback + redis.print)
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

// Promisify the client.get method
const getAsync = promisify(client.get).bind(client);

// Function to get and display value using async/await
async function displaySchoolValue(schoolName) {
  try {
    const value = await getAsync(schoolName);
    console.log(value);
  } catch (err) {
    console.error('Error:', err);
  }
}

// Test the functions
(async () => {
  await displaySchoolValue('ALX');
  setNewSchool('ALXSanFrancisco', '100');
  await displaySchoolValue('ALXSanFrancisco');
})();
