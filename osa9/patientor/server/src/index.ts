import logger from "./utils/logger";

import app from './app';

const PORT = 3001;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});