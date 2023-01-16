// import { generateAdminRole, generateAdminUser, generatePermissions } from './api/db.seed';
import app from './app';
import logger from './helpers/logger.helper';

const { PORT } = process.env;

const port = PORT || 5000;

const server = app.listen(port, async () => {
  // generatePermissions();
  // generateAdminRole();
  // generateAdminUser();
  logger.info(`Server is running on http://localhost:${port}`);
});

server.timeout = 1200000;
