const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app= express();
        this.port= process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        
        //conectar a la base de datos 
        this.conectarDB();
        //Middlewares
        this.middlewares();

        
        //Rutas de mi aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use(cors());
        
        //lectura y parseo del body
        this.app.use(express.json());
        
        //Directorio Publico
        this.app.use(express.static('public'));
    }

    routes() {
    this.app.use(this.usuariosPath, require('../routes/usuarios'));
    //    this.app.use('/api/usuarios', require('../routes/user'));

    }

    listen(){
        this.app.listen( this.port, ()=>{
            console.log('servidor corriendo en puerto', this.port);
        });
    }
    
}




module.exports= Server;