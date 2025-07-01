import { AppDataSource } from './data-source';
import app from './app';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
    console.log(`Swagger docs em http://localhost:${PORT}/docs`);
  });
});
