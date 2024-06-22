const { v4: uuidv4 } = require('uuid');

let savingsDB = [
  {
    "id": 1,
    "userId": 1,
    "interestRate": 1.2,
    "balance": 500,
    "createdAt": "2024-03-10",
 }
]

class SavingsModel {
  create(saving) {
    saving.id = uuidv4();
    savingsDB.push(saving);
  }

  show() {
    return savingsDB;
  }

  showByID(id) {
    return savingsDB.filter(saving => saving.id == id);
  }

  edit(saving, id) {
    const index = savingsDB.findIndex(saving => saving.id == id);
    return savingsDB[index] = saving;
  }

  delete(id) {
    const index = savingsDB.findIndex(saving => saving.id == id);
    savingsDB.splice(index, 1);
    return savingsDB;
  }

  showByUserID(id) {
    return savingsDB.filter(saving => saving.userId == id);
  }
}

module.exports = new SavingsModel();