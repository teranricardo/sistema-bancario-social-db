var express = require('express');
var router = express.Router();
var usersController = require("../controllers/users.c");

/* POST crear usuario */
router.post('/', (req, res) => usersController.create(req, res));

/* GET listar usuarios */
router.get('/', (req, res) => usersController.show(req, res));

/* GET usuario por id */
router.get('/:id', (req, res) => usersController.showByID(req, res));

/* PUT editar usuario */
router.put('/:id', (req, res) => usersController.edit(req, res));

/* DELETE eliminar usuario */
router.delete('/:id', (req, res) => usersController.delete(req, res));

/* GET cuentas del usuario */
router.get('/:id/accounts', (req, res) => usersController.getAccounts(req, res));

/* GET resumen de cuentas del usuario */
router.get('/:id/accounts/summary', (req, res) => usersController.summaryAccounts(req, res));

module.exports = router;