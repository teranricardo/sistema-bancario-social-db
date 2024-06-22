var usersModel = require("../models/users.m");
var loansModel = require("../models/loans.m");
var savingsModel = require("../models/savings.m");
var cooperativeModel = require("../models/cooperatives.m");

class UsersController {
  create(req, res) {
    let user = req.body;

    if (!user.name) {
      return res.status(405).send("Faltan datos del usuario por agregar.");
    }

    usersModel.create(user);
    return res.status(201).send(user);
  }

  show(req, res) {
    res.status(200).send(usersModel.show());
  }

  showByID(req, res) {
    const id = req.params.id;

    const result = usersModel.showByID(id);

    if (result.length === 0) {
      return res.status(404).send(`No se encontró el usuario con id: ${id}`);
    }

    res.status(200).send(result);
  }

  edit(req, res) {
    const id = req.params.id;
    const updatedUser = req.body;

    const result = usersModel.showByID(id);
    if (result.length === 0) {
      return res.status(404).send(`No se encontró el usuario con id: ${id}`);
    }

    res.status(200).send(usersModel.edit(updatedUser, id));
  }

  delete(req, res) {
    const id = req.params.id;

    const result = usersModel.showByID(id);
    if (result.length === 0) {
      return res.status(404).send(`No se encontró el usuario con id: ${id}`);
    }

    res.status(200).send(usersModel.delete(id));
  }

  getAccounts(req, res) {
    const id = req.params.id;
    const result = usersModel.showByID(id);
    if (result.length === 0) {
      return res.status(404).send(`No se encontró el usuario con id: ${id}`);
    }

    const loansAccount = loansModel.showByUserID(id);
    const savingsAccount = savingsModel.showByUserID(id);
    const cooperativesAccount = cooperativeModel.showByUserID(id);

    const accounts = {
      loans: loansAccount,
      savings: savingsAccount,
      cooperatives: cooperativesAccount
    }

    const { loans, savings, cooperatives } = accounts;

    res.status(200).render('accounts', { title: 'Cuentas', name: result[0].name, loans, savings, cooperatives });
    // res.status(200).send(accounts);
  }

  summaryAccounts(req, res) {
    const id = req.params.id;
    const result = usersModel.showByID(id);
    if (result.length === 0) {
      return res.status(404).send(`No se encontró el usuario con id: ${id}`);
    }

    const loansAccount = loansModel.showByUserID(id);
    const savingsAccount = savingsModel.showByUserID(id);
    const cooperativesAccount = cooperativeModel.showByUserID(id);

    const totalLoanBalance = loansAccount.reduce((sum, loan) => sum + loan.balance, 0);
    const totalSavingsBalance = savingsAccount.reduce((sum, saving) => sum + saving.balance, 0);
    const totalCooperativeBalance = cooperativesAccount.reduce((sum, cooperative) => sum + cooperative.balance, 0);


    const totalLoanInterest = loansAccount.reduce((sum, loan) => sum + loan.interestRate, 0);
    const averageLoanInterestRate = loansAccount.length > 0 ? totalLoanInterest / loansAccount.length : 0;

    const totalSavingsInterest = savingsAccount.reduce((sum, saving) => sum + saving.interestRate, 0);
    const averageSavingsInterestRate = savingsAccount.length > 0 ? totalSavingsInterest / savingsAccount.length : 0;

    const totalCooperativeInterest = cooperativesAccount.reduce((sum, cooperative) => sum + cooperative.interestRate, 0);
    const averageCooperativeInterestRate = cooperativesAccount.length > 0 ? totalCooperativeInterest / cooperativesAccount.length : 0;


    const averageLoanBalance = loansAccount.length > 0 ? totalLoanBalance / loansAccount.length : 0;
    const averageSavingsBalance = savingsAccount.length > 0 ? totalSavingsBalance / savingsAccount.length : 0;
    const averageCooperativeBalance = cooperativesAccount.length > 0 ? totalCooperativeBalance / cooperativesAccount.length : 0;

    const accounts =
    {
      loans: {
        balance: totalLoanBalance,
        averageInterestRate: averageLoanInterestRate,
        averageBalance: averageLoanBalance
      },
      savings: {
        balance: totalSavingsBalance,
        averageInterestRate: averageSavingsInterestRate,
        averageBalance: averageSavingsBalance
      },
      cooperatives: {
        balance: totalCooperativeBalance,
        averageInterestRate: averageCooperativeInterestRate,
        averageBalance: averageCooperativeBalance
      }
    };

    const { loans, savings, cooperatives } = accounts;

    res.status(200).render('summary-accounts', { title: 'Resumen de cuentas', name: result[0].name, loans, savings, cooperatives });
    // res.status(200).send(accounts);
  }
}

module.exports = new UsersController();