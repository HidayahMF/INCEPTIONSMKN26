import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });
import { app } from './app.js';
import { isDevQuickLoginEnabled } from './modules/auth/dev-quick-login.js';
const port = Number(process.env.PORT || 3000);
const host = isDevQuickLoginEnabled() ? '127.0.0.1' : (process.env.HOST || undefined);
app.listen(port, host, () => console.log(`SMKN26 API available on http://localhost:${port}`));
