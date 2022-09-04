import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { verifyErplyUser } from './services/erply/verification.service';

const app: Express = express();
const port: string | number = process.env.PORT || 80;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => res.send('ok'));

(async () => {
  console.log('>>>>> Verification started');
  const verification = await verifyErplyUser();
  console.log('>>>>> Verification response start');
  console.log(verification);
  console.log('>>>>> Verification response end');
})();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
