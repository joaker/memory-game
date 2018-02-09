const logger = require('../lib/logger');
import port from '../port';

logger.info('Starting server...');
require('../../server/main').listen(port, () => {
    logger.success('Server is running at http://localhost:3000');
});
