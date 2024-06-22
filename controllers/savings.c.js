var savingsModel = require("../models/savings.m");
var usersModel = require("../models/users.m");

class SavingController {
  create(req, res) {
    let saving = req.body;

    if (!saving.userId || !saving.interestRate || !saving.balance) {
      return res.status(405).send("Faltan datos de la cuenta de ahorro por agregar.");
    }

    const result = usersModel.showByID(saving.userId);

    if (result.length === 0) {
      return res.status(404).send(`No se encontró el usuario con id: ${saving.userId}`);
    }

    saving = { ...saving, createdAt: new Date() }

    savingsModel.create(saving);
    return res.status(201).send(saving);
  }

  show(req, res) {
    res.status(200).send(savingsModel.show());
  }

  showByID(req, res) {
    const id = req.params.id;

    const result = savingsModel.showByID(id);

    if (result.length === 0) {
      return res.status(404).send(`No se encontró la cuenta de ahorro con id: ${id}`);
    }

    res.status(200).send(result);
  }

  edit(req, res) {
    const id = req.params.id;
    const updatedSaving = req.body;

    const savingResult = savingsModel.showByID(id);
    if (savingResult.length === 0) {
      return res.status(404).send(`No se encontró la cuenta de ahorro con id: ${id}`);
    }

    if (updatedSaving.userId) {
      const userResult = usersModel.showByID(updatedSaving.userId);
      if (userResult.length === 0) {
        return res.status(404).send(`No se encontró el usuario con id: ${updatedSaving.userId}`);
      }
    }

    const saving = {
      id: id,
      userId: updatedSaving.userId ? updatedSaving.userId : savingResult[0].userId,
      interestRate: updatedSaving.interestRate ? updatedSaving.interestRate : savingResult[0].interestRate,
      createdAt: savingResult[0].createdAt,
      balance: updatedSaving.balance ? updatedSaving.balance : savingResult[0].balance,
    };

    res.status(200).send(savingsModel.edit(saving, id));
  }

  delete(req, res) {
    const id = req.params.id;

    const result = savingsModel.showByID(id);
    if (result.length === 0) {
      return res.status(404).send(`No se encontró la cuenta de ahorro con id: ${id}`);
    }

    res.status(200).send(savingsModel.delete(id));
  }
}

module.exports = new SavingController();