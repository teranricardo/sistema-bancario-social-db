var express = require('express');
var router = express.Router();
var loansController = require("../controllers/loans.c");

/* POST crear loan */
router.post('/', (req, res) => loansController.create(req, res));

/* GET loan listing. */
router.get('/', (req, res) => loansController.show(req, res));

/* GET loan por id */
router.get('/:id', (req, res) => loansController.showByID(req, res));

/* PUT editar loan */
router.put('/:id', (req, res) => loansController.edit(req, res));

/* DELETE eliminar loan */
router.delete('/:id', (req, res) => loansController.delete(req, res));

/* GET próxima fecha de pago de loan */
router.get('/next-payment-date/:id', (req, res) => loansController.getNextPaymentDate(req, res));

module.exports = router;