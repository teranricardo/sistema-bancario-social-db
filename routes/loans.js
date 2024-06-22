var express = require('express');
var router = express.Router();
var loansController = require("../controllers/loans.c");

/* POST crear loan */
router.post('/', loansController.create);

/* GET loan listing. */
router.get('/', loansController.show);

/* POST loan por id */
router.get('/:id', loansController.showByID);

/* PUT editar loan */
router.put('/:id', loansController.edit);

/* DELETE eliminar loan */
router.delete('/:id', loansController.delete);

/* GET próxima fecha de pago de loan */
router.get('/next-payment-date/:id', loansController.getNextPaymentDate);

module.exports = router;