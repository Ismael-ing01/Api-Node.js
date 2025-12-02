const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API REST Node.js',
    description: 'Documentación generada automáticamente',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const outputFile = './src/swagger_output.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
