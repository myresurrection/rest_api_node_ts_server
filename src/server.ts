import express from 'express';
import router from './router';
import db from './config/db';

// Conectar a la deb

async function connectDb() {
    try {
        db.authenticate();
        db.sync();
        console.log('Conectado a la DB OK')
    } catch (error) {
        console.log('Hubo un error al conectar a la base de datos')
    }

}
connectDb();
// Cremaos el servidor
const server = express();

server.use('/api/products', router)


export default server;