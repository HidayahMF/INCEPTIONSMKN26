import 'dotenv/config';
import { app } from './app.js';
const port = Number(process.env.PORT || 3000);
app.listen(port,()=>console.log(`SMKN26 API available on http://localhost:${port}`));
