var express = require('express');
var router = express.Router();
var usersController = require("../controllers/users.c");

/* POST crear user */
router.post('/', usersController.create);

/* GET users listing. */
router.get('/', usersController.show);

/* POST user por id */
router.get('/:id', usersController.showByID);

/* PUT editar user */
router.put('/:id', usersController.edit);

/* DELETE eliminar user */
router.delete('/:id', usersController.delete);

/* GET cuentas del user */
router.get('/accounts/:id', usersController.getAccounts);

/* GET resumen de cuentas del user */
router.get('/summary-accounts/:id', usersController.summaryAccounts);

module.exports = router;