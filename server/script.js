import http from 'k6/http';
import { check, sleep } from 'k6';

// specify stages of your test (ramp up/down patterns) through the options object
// target is the number of VUs you are aiming for

export let options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '10s', target: 100 },
    { duration: '1s', target: 1000 },
    { duration: '1m', target: 1000 },
    { duration: '30s', target: 0 },
  ],
};

export default function() {
  const id = Math.floor(Math.random()) * (10000000 - 1) + 1;
  let res = http.get(`http://localhost:3001/api/listings/${id}`);
  sleep(1);

  const checkRes = check(res, {
    'status is 200': r => r.status === 200,
  });
}


