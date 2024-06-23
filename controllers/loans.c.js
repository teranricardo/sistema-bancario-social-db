const loansModel = require('../models/loans.m');
const usersModel = require('../models/users.m');

class LoansController {
  create(req, res) {
    const loan = req.body;
    if (!loan.userId || !loan.amount || !loan.interestRate || !loan.balance || !loan.nextPaymentDate) {
      return res.status(400).send("Faltan datos del préstamo por agregar.");
    }

    usersModel.showByID(loan.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send(`No se encontró el usuario con ID: ${loan.userId}`);
        }
        loan.nextPaymentDate = new Date(req.body.nextPaymentDate);
        loan.createdAt = new Date();
        return loansModel.create(loan)
          .then(() => res.status(201).send(loan))
          .catch((err) => res.status(500).send(`Error al crear el préstamo: ${err}`));
      })
      .catch((err) => res.status(500).send(`Error al crear el préstamo: ${err}`));
  }

  show(req, res) {
    loansModel.show()
      .then((loans) => res.status(200).send(loans))
      .catch((err) => res.status(500).send(`Error al listar los préstamos: ${err}`));
  }

  showByID(req, res) {
    const id = req.params.id;
    loansModel.showByID(id)
      .then((loan) => {
        if (!loan) {
          return res.status(404).send(`No se encontró el préstamo con ID: ${id}`);
        }
        res.status(200).send(loan);
      })
      .catch((err) => res.status(500).send(`Error al buscar el préstamo: ${err}`));
  }

  edit(req, res) {
    const id = req.params.id;
    const updatedLoan = req.body;
    loansModel.showByID(id)
      .then((loan) => {
        if (!loan) {
          return res.status(404).send(`No se encontró el préstamo con ID: ${id}`);
        }
        return loansModel.edit(updatedLoan, id);
      })
      .then(() => res.status(200).send(`Préstamo con ID ${id} editado correctamente.`))
      .catch((err) => res.status(500).send(`Error al editar el préstamo: ${err}`));
  }

  delete(req, res) {
    const id = req.params.id;
    loansModel.showByID(id)
      .then((loan) => {
        if (!loan) {
          return res.status(404).send(`No se encontró el préstamo con ID: ${id}`);
        }
        return loansModel.delete(id)
          .then(() => res.status(200).send(`Préstamo con ID ${id} eliminado correctamente.`))
          .catch((err) => res.status(500).send(`Error al eliminar el préstamo: ${err}`));
      })
      .catch((err) => res.status(500).send(`Error al eliminar el préstamo: ${err}`));
  }

  getNextPaymentDate(req, res) {
    const id = req.params.id;
    loansModel.showByID(id)
      .then((loan) => {
        if (!loan) {
          return res.status(404).send(`No se encontró el préstamo con ID: ${id}`);
        }
        const date = loan.nextPaymentDate;
        const id = loan.id;
        res.status(200).render("next-payment-date");
        res.render('next-payment-date', { id, date });
      })
      .catch((err) => res.status(500).send(`Error al buscar el préstamo: ${err}`));
  }
}

module.exports = new LoansController();