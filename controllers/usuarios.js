const { response } = require('express')
const bcriptjs = require('bcryptjs')
const Usuario = require('../models/usuario')



const usuariosGet = async(req = request, res = response)=>{
    
    const {limite = 5, desde= 0} = req.query;
    const query = {estado: true}
    // const usuarios = await Usuario.find(query)
    // .skip(Number(desde))
    // .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))

    ])
    res.json({
        total, 
        usuarios
    })
}

const usuariosPost = async(req, res = response)=>{

   
    const {nombre, correo, password,rol} = req.body;
    const usuario = new Usuario({nombre, correo, password,rol});

    //verificar correo usuario
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        return res.status(200).json({
            msg: 'ese correo ya esta registrado'
        })
    }

    // encriptar contaseña
    const salt = bcriptjs.genSaltSync();
    usuario.password = bcriptjs.hashSync(password, salt)

    //guardar en db
    await usuario.save();

    res.json({
        msg: 'post API',
        usuario,
    })
}

const usuariosPut = async (req, res= response)=>{

    const { id } = req.params;   
    const {_id, password, google, correo, ...resto} =req.body;

    if (password) {
        const salt = bcriptjs.genSaltSync();
        resto.password = bcriptjs.hashSync(password, salt)          
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
        res.json(usuario)
}

const usuariosPatch = (req, res = response)=>{
    res.json({
        msg: 'patch API'
    })
}

const usuariosDelete = async (req, res = response)=>{

    const {id} = req.params;
    // const usuario = await Usuario.findByIdAndDelete(id);
   

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    res.json(usuario);

}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}