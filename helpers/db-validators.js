const Role = require('../models/role');
const Usuario = require('../models/usuario');


 const esRolValido = async(rol = '')=>{

    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
      throw new Error(`el rol ${rol} no esta registrado en la DB`)
    }
    }

    const existeEmail = async(correo = '')=>{
        const existeEmail = await Usuario.findOne({correo});
        if (existeEmail) {
            throw new Error(`el correo: ${correo} ya esta registrado en la DB`);

        }
    }

    
    const existeUsuarioPorId = async(id = '')=>{
        const existeUsuario = await Usuario.findById(id);
        if (!existeUsuario) {
            throw new Error(`El ID no existe ${ id }`);

        }
    }


    module.exports ={
        esRolValido,
        existeEmail,
        existeUsuarioPorId
    }