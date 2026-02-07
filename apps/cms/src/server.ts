import 'dotenv/config';
import express from 'express';
import payload from 'payload';

const app = express();
const PORT = process.env.PORT || 3001;

async function start() {
  await payload.init({
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload CMS initialized. Admin URL: ${payload.getAdminURL()}`);
    },
  });

  app.listen(PORT, () => {
    payload.logger.info(`Server running on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start Payload CMS:', err);
  process.exit(1);
});
