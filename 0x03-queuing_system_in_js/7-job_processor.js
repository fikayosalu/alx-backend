// 7-job_processor.js
import kue from 'kue';

// Create the queue
const queue = kue.createQueue();

// Blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

/**
 * Send notification with progress tracking and blacklist check
 */
function sendNotification(phoneNumber, message, job, done) {
  // Initial progress
  job.progress(0, 100);

  // Check blacklist
  if (blacklistedNumbers.includes(phoneNumber)) {
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  // Midway progress
  job.progress(50, 100);

  // Simulate sending message
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Complete the job
  done();
}

// Process jobs with concurrency of 2
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
