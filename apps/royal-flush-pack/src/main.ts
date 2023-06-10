import {createServer} from 'http';
import {server} from './server';
import {DatabaseDriver} from './config/database.driver';
import expressListRoutes from 'express-list-routes';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
(async () => {

  await DatabaseDriver.sync({force: false, logging: false});

  createServer(server)
    .listen(port, host, async() => {
      try {
        await DatabaseDriver.authenticate();
        console.log('Connection has been established successfully.');
        if(process.env.NODE_ENV === 'development'){
          expressListRoutes(server);
        }
        console.log(`[ ready ] http://${host}:${port}`);
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        if(process.env.NODE_ENV !== 'production'){
          console.log('huh')
        }
      }
    }).on('error', (err) => {
      console.debug(err.message)
    });

})();
