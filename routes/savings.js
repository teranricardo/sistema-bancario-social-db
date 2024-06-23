var express = require('express');
var router = express.Router();
var savingsController = require("../controllers/savings.c");

/* POST crear saving */
router.post('/', (req, res) => savingsController.create(req, res));

/* GET listar savings */
router.get('/', (req, res) => savingsController.show(req, res));

/* GET saving por id */
router.get('/:id', (req, res) => savingsController.showByID(req, res));

/* PUT editar saving */
router.put('/:id', (req, res) => savingsController.edit(req, res));

/* DELETE eliminar saving */
router.delete('/:id', (req, res) => savingsController.delete(req, res));

module.exports = router;