var express = require('express');
var router = express.Router();
var savingsController = require("../controllers/savings.c");

/* POST crear saving */
router.post('/', savingsController.create);

/* GET saving listing. */
router.get('/', savingsController.show);

/* POST saving por id */
router.get('/:id', savingsController.showByID);

/* PUT editar saving */
router.put('/:id', savingsController.edit);

/* DELETE eliminar saving */
router.delete('/:id', savingsController.delete);

module.exports = router;