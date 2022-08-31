const { ObjectID } = require('mongodb');
const { getDb } = require('../util/database');

class Product {
  constructor(title, price, description, imageUrl, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    return db
      .collection('products')
      .insertOne(this)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  static fetchById(productId) {
    const db = getDb();

    return db
      .collection('products')
      .findOne({ _id: ObjectID(productId) })
      .then((product) => product)
      .catch((err) => console.error(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then((products) => {
        console.log('LOG IN "PRODUCT" FETCH ALL: ', products);
        return products;
      })
      .catch((err) => console.error(err));
  }

  static updateProduct(productId, fields) {
    const db = getDb();
    const filter = { _id: ObjectID(productId) };
    const options = { upsert: true };
    const updateDoc = {
      $set: fields,
    };

    return db.collection('products')
      .updateOne(filter, updateDoc, options)
      .then(product => {
        console.log('Updated product in "Product": ', product)
        return product;
      })
      .catch(err => console.error(err))

  }

  static deleteProduct(productId) {
    const db = getDb();
    const filter = { _id: ObjectID(productId) };

    return db
      .collection("products")
      .deleteOne(filter)
      .then(result => {
        console.log('Success! Product was deleted.', result);
        return result;
      })
      .catch(err => console.error(err))
  }
}

module.exports = Product;
