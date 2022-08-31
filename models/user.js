const { ObjectID } = require('mongodb');
const { getDb } = require('../util/database');

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  save() {
    const db = getDb();

    return db.collection('users').insertOne(this)
  }

  addToCart(product) {

  }

  static findById(userId) {
    const db = getDb();

    const id = new ObjectID(userId);

    return db.collection('users').findOne({ _id: id })
  }

}

module.exports = User;