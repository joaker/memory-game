const envPort = process && process.env && process.env.PORT;
const defaultPort = 3000;
const port = envPort || defaultPort;

module.exports = port;
