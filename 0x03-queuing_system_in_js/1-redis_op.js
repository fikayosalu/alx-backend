// 1-redis_op.js
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

// Function to set a value (using redis.print for confirmation)
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

// Function to get and display a value
function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, reply) => {
    if (err) {
      console.error('Error:', err);
      return;
    }
    console.log(reply);
  });
}

// Test the functions
displaySchoolValue('ALX');
setNewSchool('ALXSanFrancisco', '100');
displaySchoolValue('ALXSanFrancisco');
