var express = require('express');
var router = express.Router();
var cooperativesController = require("../controllers/cooperatives.c");

/* POST crear cooperative */
router.post('/', cooperativesController.create);

/* GET cooperative listing. */
router.get('/', cooperativesController.show);

/* POST cooperative por id */
router.get('/:id', cooperativesController.showByID);

/* PUT editar cooperative */
router.put('/:id', cooperativesController.edit);

/* DELETE eliminar cooperative */
router.delete('/:id', cooperativesController.delete);

/* PUT agregar usuario a cooperative */
router.put('/add-user/:id', cooperativesController.addUser);

module.exports = router;