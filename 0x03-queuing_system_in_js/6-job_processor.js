// 6-job_processor.js
import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// Define the notification handler function
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process jobs in the "push_notification_code" queue
queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message);
  done(); // Signal job completion
});
