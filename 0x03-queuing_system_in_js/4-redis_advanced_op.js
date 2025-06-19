// 4-redis_advanced_op.js
import redis from 'redis';

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

// Store hash values using hset (with redis.print)
client.hset('ALX', 'Portland', 50, redis.print);
client.hset('ALX', 'Seattle', 80, redis.print);
client.hset('ALX', 'New York', 20, redis.print);
client.hset('ALX', 'Bogota', 20, redis.print);
client.hset('ALX', 'Cali', 40, redis.print);
client.hset('ALX', 'Paris', 2, redis.print);

// Retrieve the entire hash using hgetall
client.hgetall('ALX', (err, reply) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log(reply);
});

