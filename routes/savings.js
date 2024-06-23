var express = require('express');
var router = express.Router();
var savingsController = require("../controllers/savings.c");

/* POST crear saving */
router.post('/', (req, res) => savingsController.create(req, res));

/* GET formulario de creación de saving */
router.get('/new', (req, res) => savingsController.createForm(req, res));

/* GET listar savings */
router.get('/', (req, res) => savingsController.show(req, res));

/* GET saving por id */
router.get('/:id', (req, res) => savingsController.showByID(req, res));

/* GET formulario de edición de saving */
router.get('/:id/edit', (req, res) => savingsController.edit(req, res));

/* PUT editar saving */
router.put('/:id', (req, res) => savingsController.update(req, res));

/* DELETE eliminar saving */
router.delete('/:id', (req, res) => savingsController.delete(req, res));

module.exports = router;