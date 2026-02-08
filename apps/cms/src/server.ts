import 'dotenv/config';
import express from 'express';
import { getPayload } from 'payload';
import config from './payload.config';

const app = express();
const PORT = process.env.PORT || 3001;

async function start() {
  const payload = await getPayload({ config });

  app.listen(PORT, () => {
    payload.logger.info(`Payload CMS running on port ${PORT}`);
    payload.logger.info(`Admin URL: ${payload.config.serverURL}/admin`);
  });
}

start().catch((err) => {
  console.error('Failed to start Payload CMS:', err);
  process.exit(1);
});
