import express from 'express';
import colors from 'colors';
import router from './router';
import db from './config/db';

// Conectar a la deb

async function connectDb() {
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.magenta.bold('Conectado a la DB OK'))
    } catch (error) {
        console.log(colors.red.bold ('Hubo un error al conectar a la base de datos'))
    }

}
connectDb();
// Cremaos el servidor
const server = express();

// Leer datos de formularios
server.use(express.json())

server.use('/api/products', router)


server.get('/api', (req,res) => {
    res.json({msg: 'Desde API'})
})

export default server;