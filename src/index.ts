import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running on port ${process.env.PORT}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});

export default app;
