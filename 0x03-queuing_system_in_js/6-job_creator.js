// 6-job_creator.js
import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// Create job data
const jobData = {
  phoneNumber: '1234567890',
  message: 'This is a test notification',
};

// Create a job in the queue "push_notification_code"
const job = queue.create('push_notification_code', jobData);

// Register event listeners
job
  .save((err) => {
    if (!err) {
      console.log(`Notification job created: ${job.id}`);
    } else {
      console.error('Job creation failed:', err);
    }
  });

job.on('complete', () => {
  console.log('Notification job completed');
});

job.on('failed', () => {
  console.log('Notification job failed');
});
