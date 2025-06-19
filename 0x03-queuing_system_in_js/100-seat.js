// 100-seat.js
import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';
import kue from 'kue';

const app = express();
const port = 1245;

// Redis client
const client = createClient();
client.on('connect', () => console.log('Redis client connected to the server'));
client.on('error', (err) => console.error('Redis client error:', err));

// Promisify Redis methods
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Kue queue
const queue = kue.createQueue();

// Global variable to control reservation
let reservationEnabled = true;

// Redis functions
async function reserveSeat(number) {
  await setAsync('available_seats', number);
}

async function getCurrentAvailableSeats() {
  const seats = await getAsync('available_seats');
  return parseInt(seats, 10);
}

// Set initial seat count
await reserveSeat(50);

// Routes
app.get('/available_seats', async (req, res) => {
  const number = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: number });
});

app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation are blocked' });
  }

  const job = queue.create('reserve_seat');

  job.save((err) => {
    if (!err) {
      res.json({ status: 'Reservation in process' });
    } else {
      res.json({ status: 'Reservation failed' });
    }
  });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', (err) => {
    console.log(`Seat reservation job ${job.id} failed: ${err}`);
  });
});

app.get('/process', (req, res) => {
  res.json({ status: 'Queue processing' });

  queue.process('reserve_seat', async (job, done) => {
    const currentSeats = await getCurrentAvailableSeats();

    if (currentSeats <= 0) {
      reservationEnabled = false;
      return done(new Error('Not enough seats available'));
    }

    const newSeats = currentSeats - 1;
    await reserveSeat(newSeats);

    if (newSeats === 0) {
      reservationEnabled = false;
    }

    done();
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
