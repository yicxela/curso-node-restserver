const {Schema, model} = require('mongoose');

const rolShema = Schema({
    rol: {
        type: String,
        require: [true, 'El rol es Obigatorio']
    }

});
 


module.exports = model('Role', rolShema);