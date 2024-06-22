const { v4: uuidv4 } = require('uuid');

let cooperativesDB = [
  {
    "id": "1",
    "name": "Cooperativa ABC",
    "members": ["1"],
    "interestRate": 4,
    "balance": 500,
    "createdAt": "2024-03-10",
  }
]

class CooperativesModel {
  create(cooperative) {
    cooperative.id = uuidv4();
    cooperativesDB.push(cooperative);
  }

  show() {
    return cooperativesDB;
  }

  showByID(id) {
    return cooperativesDB.filter(cooperative => cooperative.id == id);
  }

  edit(cooperative, id) {
    const index = cooperativesDB.findIndex(cooperative => cooperative.id == id);
    return cooperativesDB[index] = cooperative;
  }

  delete(id) {
    const index = cooperativesDB.findIndex(cooperative => cooperative.id == id);
    cooperativesDB.splice(index, 1);
    return cooperativesDB;
  }

  addUser(cooperative, userId) {
    const index = cooperativesDB.findIndex(cooperative => cooperative.id == userId);
    return cooperativesDB[index] = cooperative;
  }

  showByUserID(id) {
    return cooperativesDB.filter(cooperative => cooperative.members.includes(id));
  }
}

module.exports = new CooperativesModel();