var cooperativesModel = require("../models/cooperatives.m");
var usersModel = require("../models/users.m");

class CooperativesController {
  create(req, res) {
    let cooperative = req.body;

    if (!cooperative.name || !cooperative.interestRate || !cooperative.balance) {
      return res.status(405).send("Faltan datos de la cooperativa por agregar.");
    }

    if (cooperative.members) {
      const result = usersModel.areUsersValid(cooperative.members);

      if (!result) {
        return res.status(404).send(`No se encontró(aron) algún(os) usuario(s) con los siguientes id: ${cooperative.members}`);
      }
    } else {
      cooperative.members = [];
    }

    cooperative = { ...cooperative, createdAt: new Date() }

    cooperativesModel.create(cooperative);
    return res.status(201).send(cooperative);
  }

  show(req, res) {
    res.status(200).send(cooperativesModel.show());
  }

  showByID(req, res) {
    const id = req.params.id;

    const result = cooperativesModel.showByID(id);

    if (result.length === 0) {
      return res.status(404).send(`No se encontró la cooperativa con id: ${id}`);
    }

    res.status(200).send(result);
  }

  edit(req, res) {
    const id = req.params.id;
    const updatedCooperative = req.body;

    const cooperativeResult = cooperativesModel.showByID(id);
    if (cooperativeResult.length === 0) {
      return res.status(404).send(`No se encontró la cooperativa con id: ${id}`);
    }

    if (updatedCooperative.members) {
      const result = usersModel.areUsersValid(updatedCooperative.members);
      if (!result) {
        return res.status(404).send(`No se encontró(aron) algún(os) usuario(s) con los siguientes id: ${updatedCooperative.members}`);
      }
    }

    const cooperative = {
      id: id,
      name: updatedCooperative.name ? updatedCooperative.name : cooperativeResult[0].name,
      members: updatedCooperative.members ? updatedCooperative.members : cooperativeResult[0].members,
      balance: updatedCooperative.balance ? updatedCooperative.balance : cooperativeResult[0].balance,
      interestRate: updatedCooperative.interestRate ? updatedCooperative.interestRate : cooperativeResult[0].interestRate,
      createdAt: cooperativeResult[0].createdAt,
    };

    res.status(200).send(cooperativesModel.edit(cooperative, id));
  }

  delete(req, res) {
    const id = req.params.id;

    const result = cooperativesModel.showByID(id);
    if (result.length === 0) {
      return res.status(404).send(`No se encontró la cooperativa con id: ${id}`);
    }

    res.status(200).send(cooperativesModel.delete(id));
  }

  addUser(req, res) {
    const cooperativeId = req.params.id;
    const userId = req.body.userId;


    const cooperativeResult = cooperativesModel.showByID(cooperativeId);
    if (cooperativeResult.length === 0) {
      return res.status(404).send(`No se encontró la cooperativa con id: ${cooperativeId}`);
    }

    const userResult = usersModel.showByID(userId);
    if (userResult.length === 0) {
      return res.status(404).send(`No se encontró el usuario con id: ${userId}`);
    }

    let { members } = cooperativeResult[0];

    if (members.includes(userId)) {
      return res.status(400).send(`El usuario con id "${userId}" ya pertenece a la cooperativa.`);
    }

    members.push(userId);

    const cooperative = {
      ...cooperativeResult[0],
      members: members
    };

    res.status(200).send(cooperativesModel.addUser(cooperative, userId));
  }
}

module.exports = new CooperativesController();