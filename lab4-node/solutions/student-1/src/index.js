import 'dotenv/config';

import { createServer } from './api/server.js';
import { launchBot } from './bot/bot.js';

const port = process.env.PORT || 3000;

async function main() {
  const app = createServer();
  app.listen(port, () => {
    console.log(`[api] listening on http://localhost:${port}`);
  });

  await launchBot();
}

main();
