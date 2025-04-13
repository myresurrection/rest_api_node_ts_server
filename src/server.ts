import express from 'express';
import colors from 'colors';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express'
import swaggerSpec from './config/swagger';
import router from './router';
import db from './config/db';

// Conectar a la deb

async function connectDb() {
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.magenta.bold('Conectado a la DB OK'))
    } catch (error) {
        console.log(colors.red.bold('Hubo un error al conectar a la base de datos'))
    }

}
connectDb();
// Cremaos el servidor
const server = express();

// Permitir CORS

const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}
server.use(cors(corsOptions))
// Leer datos de formularios
server.use(express.json())

// Morgan

server.use(morgan('dev'))

server.use('/api/products', router)

// Docs

server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

export default server;