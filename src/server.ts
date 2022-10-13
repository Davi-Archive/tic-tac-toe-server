import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ "message": "typescript config" })
})


const port = process.env.PORT || 3001

app.listen(port, () =>
  console.log(`Server running at port http://localhost:${port}\n`)
)