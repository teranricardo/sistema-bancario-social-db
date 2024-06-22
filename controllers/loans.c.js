var loansModel = require("../models/loans.m");
var usersModel = require("../models/users.m");

class LoansController {
  create(req, res) {
    let loan = req.body;

    if (!loan.userId || !loan.amount || !loan.interestRate || !loan.nextPaymentDate || !loan.balance) {
      return res.status(405).send("Faltan datos del préstamo por agregar.");
    }

    const result = usersModel.showByID(loan.userId);

    if (result.length === 0) {
      return res.status(404).send(`No se encontró el usuario con id: ${loan.userId}`);
    }

    loan = { ...loan, nextPaymentDate: new Date(req.body.nextPaymentDate), createdAt: new Date() }

    loansModel.create(loan);
    return res.status(201).send(loan);
  }

  show(req, res) {
    res.status(200).send(loansModel.show());
  }

  showByID(req, res) {
    const id = req.params.id;

    const result = loansModel.showByID(id);

    if (result.length === 0) {
      return res.status(404).send(`No se encontró el préstamo con id: ${id}`);
    }

    res.status(200).send(result);
  }

  edit(req, res) {
    const id = req.params.id;
    const updatedLoan = req.body;

    const loanResult = loansModel.showByID(id);
    if (loanResult.length === 0) {
      return res.status(404).send(`No se encontró el préstamo con id: ${id}`);
    }

    if (updatedLoan.userId) {
      const userResult = usersModel.showByID(updatedLoan.userId);
      if (userResult.length === 0) {
        return res.status(404).send(`No se encontró el usuario con id: ${updatedLoan.userId}`);
      }
    }

    const loan = {
      id: id,
      userId: updatedLoan.userId ? updatedLoan.userId : loanResult[0].userId,
      amount: updatedLoan.amount ? updatedLoan.amount : loanResult[0].amount,
      interestRate: updatedLoan.interestRate ? updatedLoan.interestRate : loanResult[0].interestRate,
      nextPaymentDate: updatedLoan.nextPaymentDate ? updatedLoan.nextPaymentDate : loanResult[0].nextPaymentDate,
      createdAt: loanResult[0].createdAt,
      balance: updatedLoan.balance ? updatedLoan.balance : loanResult[0].balance,
    };

    res.status(200).send(loansModel.edit(loan, id));
  }

  delete(req, res) {
    const id = req.params.id;

    const result = loansModel.showByID(id);
    if (result.length === 0) {
      return res.status(404).send(`No se encontró el préstamo con id: ${id}`);
    }

    res.status(200).send(loansModel.delete(id));
  }

  getNextPaymentDate(req, res) {
    const id = req.params.id;

    const result = loansModel.showByID(id);

    if (result.length === 0) {
      return res.status(404).send(`No se encontró el préstamo con id: ${id}`);
    }

    // res.status(200).send(result[0].nextPaymentDate);
    res.status(200).render('next-payment-date', { title: `Cuenta con id: ${id}`, amount: result[0].nextPaymentDate });
  }
}

module.exports = new LoansController();