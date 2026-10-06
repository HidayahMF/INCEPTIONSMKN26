import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });
import { app } from './app.js';
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || undefined;
app.listen(port, host, () => console.log(`SMKN26 API available on http://localhost:${port}`));
