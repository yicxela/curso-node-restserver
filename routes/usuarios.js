const { Router } = require("express");
const { check } = require('express-validator');
const { validarCampos, emailExiste } = require("../middlewares/validar-campos");
const { esRolValido, existeEmail, existeUsuarioPorId} = require("../helpers/db-validators");


const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");
const router = Router();

router.get("/", usuariosGet);
router.post("/",[
  check('nombre', 'el nombre  es obligatorio').not().isEmpty(),
  check('password', 'el password debe ser mas de 6 letras').isLength({min:6 }),
  check('correo', 'el correo no es valido').isEmail(),
  check('correo').custom(existeEmail),
  // check('No es un Rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('rol').custom(esRolValido),
  validarCampos

],usuariosPost);
router.put("/:id",[
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRolValido),
  validarCampos
], usuariosPut);
router.patch("/", usuariosPatch);
router.delete("/:id",[
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
], usuariosDelete);

module.exports = router;
