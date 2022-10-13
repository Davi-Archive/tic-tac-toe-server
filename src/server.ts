import 'dotenv/config';

const express = require('express')
const app = express()

app.get('/', (req: Request, res: Response) => {
res.status(200).json({"message": "typescript config"})
})


const port = process.env.PORT || 3001

app.listen(port, () =>
  console.log(`Server running at port http://localhost:${port}\n`)
)