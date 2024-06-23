var express = require('express');
var router = express.Router();
var usersController = require("../controllers/users.c");

/* GET listar usuarios */
router.get('/', (req, res) => usersController.show(req, res));

/* POST crear usuario */
router.post('/', (req, res) => usersController.create(req, res));

/* GET mostrar formulario para crear usuario */
router.get('/new', (req, res) => res.render('users/new'));

/* GET mostrar usuario por id */
router.get('/:id', (req, res) => usersController.showByID(req, res, edit = false));

/* GET mostrar usuario por id */
router.get('/:id/edit', (req, res) => usersController.showByID(req, res, edit = true));

/* PUT editar usuario */
router.put('/:id', (req, res) => usersController.edit(req, res));

/* DELETE eliminar usuario */
router.delete('/:id', (req, res) => usersController.delete(req, res));

/* GET cuentas del usuario */
router.get('/:id/accounts', (req, res) => usersController.getAccounts(req, res));

/* GET resumen de cuentas del usuario */
router.get('/:id/accounts/summary', (req, res) => usersController.summaryAccounts(req, res));

module.exports = router;