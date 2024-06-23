var usersModel = require("../models/users.m");
var loansModel = require("../models/loans.m");
var savingsModel = require("../models/savings.m");
var cooperativesModel = require("../models/cooperatives.m");

class UsersController {
  create(req, res) {
    const user = req.body;
    if (!user.name) {
      return res.status(400).send("Faltan datos del usuario por agregar.");
    }
    usersModel.create(user)
      .then(() => res.redirect('/users'))
      .catch((err) => res.status(500).send(`Error al crear usuario: ${err}`));
  }

  show(req, res) {
    usersModel.show()
      .then((users) => res.render('users/index', { users }))
      .catch((err) => res.status(500).send(`Error al listar usuarios: ${err}`));
  }

  showByID(req, res, edit) {
    const id = req.params.id;
    usersModel.showByID(id)
      .then((user) => {
        if (!user) {
          return res.status(404).send(`No se encontró el usuario con id: ${id}`);
        }
        if (edit) {
          return res.render('users/edit', { user });
        }

        return res.render('users/show', { user });
      })
      .catch((err) => res.status(500).send(`Error al buscar usuario: ${err}`));
  }

  edit(req, res) {
    const id = req.params.id;
    const updatedUser = req.body;
    usersModel.showByID(id)
      .then((user) => {
        if (!user) {
          return res.status(404).send(`No se encontró el usuario con id: ${id}`);
        }
        usersModel.edit(updatedUser, id)
          .then(() => res.redirect(`/users/${id}`))
          .catch((err) => res.status(500).send(`Error al editar usuario: ${err}`));
      })
      .catch((err) => res.status(500).send(`Error al buscar usuario: ${err}`));
  }

  delete(req, res) {
    const id = req.params.id;
    usersModel.showByID(id)
      .then((user) => {
        if (!user) {
          return res.status(404).send(`No se encontró el usuario con id: ${id}`);
        }
        usersModel.delete(id)
          .then(() => res.redirect('/users'))
          .catch((err) => res.status(500).send(`Error al eliminar usuario: ${err}`));
      })
      .catch((err) => res.status(500).send(`Error al buscar usuario: ${err}`));
  }

  getAccounts(req, res) {
    const id = req.params.id;
    usersModel.showByID(id)
      .then((user) => {
        if (!user) {
          return res.status(404).send(`No se encontró el usuario con id: ${id}`);
        }
        const loansAccount = loansModel.showByUserID(id);
        const savingsAccount = savingsModel.showByUserID(id);
        const cooperativesAccount = cooperativesModel.showByUserID(id);
        Promise.all([loansAccount, savingsAccount, cooperativesAccount])
          .then(([loans, savings, cooperatives]) => {
            const accounts = {
              loans,
              savings,
              cooperatives
            };
            res.render('users/accounts', { accounts, user });
          })
          .catch((err) => res.status(500).send(`Error al obtener cuentas del usuario: ${err}`));
      })
      .catch((err) => res.status(500).send(`Error al buscar usuario: ${err}`));
  }

  summaryAccounts(req, res) {
    const id = req.params.id;

    usersModel.showByID(id)
      .then((user) => {
        if (!user) {
          return res.status(404).send(`No se encontró el usuario con id: ${id}`);
        }

        const loansPromise = loansModel.showByUserID(id);
        const savingsPromise = savingsModel.showByUserID(id);
        const cooperativesPromise = cooperativesModel.showByUserID(id);

        Promise.all([loansPromise, savingsPromise, cooperativesPromise])
          .then(([loans, savings, cooperatives]) => {
            // Calculating total balances
            const totalLoanBalance = loans.reduce((sum, loan) => sum + parseFloat(loan.balance), 0);
            const totalSavingsBalance = savings.reduce((sum, saving) => sum + parseFloat(saving.balance), 0);
            const totalCooperativeBalance = cooperatives.reduce((sum, cooperative) => sum + parseFloat(cooperative.balance), 0);

            // Calculating total interest rates
            const totalLoanInterest = loans.reduce((sum, loan) => sum + parseFloat(loan.interestRate), 0);
            const averageLoanInterestRate = loans.length > 0 ? totalLoanInterest / loans.length : 0;

            const totalSavingsInterest = savings.reduce((sum, saving) => sum + parseFloat(saving.interestRate), 0);
            const averageSavingsInterestRate = savings.length > 0 ? totalSavingsInterest / savings.length : 0;

            const totalCooperativeInterest = cooperatives.reduce((sum, cooperative) => sum + parseFloat(cooperative.interestRate), 0);
            const averageCooperativeInterestRate = cooperatives.length > 0 ? totalCooperativeInterest / cooperatives.length : 0;

            // Calculating average balances
            const averageLoanBalance = loans.length > 0 ? totalLoanBalance / loans.length : 0;
            const averageSavingsBalance = savings.length > 0 ? totalSavingsBalance / savings.length : 0;
            const averageCooperativeBalance = cooperatives.length > 0 ? totalCooperativeBalance / cooperatives.length : 0;

            // Constructing the summary object
            const summary = {
              loans: {
                balance: totalLoanBalance.toFixed(2),
                averageInterestRate: averageLoanInterestRate.toFixed(2),
                averageBalance: averageLoanBalance.toFixed(2)
              },
              savings: {
                balance: totalSavingsBalance.toFixed(2),
                averageInterestRate: averageSavingsInterestRate.toFixed(2),
                averageBalance: averageSavingsBalance.toFixed(2)
              },
              cooperatives: {
                balance: totalCooperativeBalance.toFixed(2),
                averageInterestRate: averageCooperativeInterestRate.toFixed(2),
                averageBalance: averageCooperativeBalance.toFixed(2)
              }
            };
            res.render('users/summary', { summary, user });
          })
          .catch((err) => res.status(500).send(`Error al obtener cuentas del usuario: ${err}`));
      })
      .catch((err) => res.status(500).send(`Error al buscar usuario: ${err}`));
  }

}

module.exports = new UsersController();