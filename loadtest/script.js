import http from 'k6/http';
import { check, sleep } from 'k6';

const smokeOptions = {
  vus: 1,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<1000'],
    http_req_failed: ['rate<0.05'],
  },
};

const loadOptions = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<400'],
    http_req_failed: ['rate<0.01'],
  },
};

export const options = __ENV.SMOKE === 'true' ? smokeOptions : loadOptions;

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function run() {
  const create = http.post(
    `${BASE_URL}/notes`,
    JSON.stringify({ title: 'k6 title', body: 'k6 body' }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  check(create, {
    'POST /notes returns 201': (res) => res.status === 201,
  });

  const list = http.get(`${BASE_URL}/notes`);

  check(list, {
    'GET /notes returns 200': (res) => res.status === 200,
  });

  sleep(1);
}
