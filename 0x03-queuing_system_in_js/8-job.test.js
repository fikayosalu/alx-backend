// 8-job.test.js
import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
  const queue = kue.createQueue();

  // Enter test mode before tests
  before(() => {
    queue.testMode.enter();
  });

  // Clear all jobs after each test
  afterEach(() => {
    queue.testMode.clear();
  });

  // Exit test mode after all tests
  after(() => {
    queue.testMode.exit();
  });

  it('should throw an error if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs('not-an-array', queue)).to.throw('Jobs is not an array');
  });

  it('should create jobs in the queue', () => {
    const jobs = [
      { phoneNumber: '123', message: 'Hello' },
      { phoneNumber: '456', message: 'Hi' }
    ];

    createPushNotificationsJobs(jobs, queue);

    expect(queue.testMode.jobs.length).to.equal(2);
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[0].data).to.deep.equal(jobs[0]);
    expect(queue.testMode.jobs[1].data.phoneNumber).to.equal('456');
  });
});
