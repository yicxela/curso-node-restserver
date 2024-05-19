const {Schema, model} =require('mongoose');


const UsuarioShema = Schema({
    nombre: {
        type: String,
        require: [true, 'el nombre es obligatorio']
    },
    correo: {
        type: String,
        require: [true, 'el correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'la contraseña es obligatorio'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        require: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

})

UsuarioShema.methods.toJSON = function(){
    const { __v, password, ...usuario} = this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioShema);