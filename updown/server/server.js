import app from './app.js';
import { PORT } from './config/envConfig.js';

app.listen(PORT, () => {
  console.log(`서버도는중. http://localhost:${PORT}`);
  }
);