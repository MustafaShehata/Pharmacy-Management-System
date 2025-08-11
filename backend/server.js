import app from './src/app.js';
import dotenv from 'dotenv';
import { checkConnection } from './src/config/database.js';

dotenv.config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  console.log(`Server running on PORT ${PORT}`);
  try {
    await checkConnection();
  } catch(err) {
    console.log("Failed to initialize the DATABASE", err);
  }
});