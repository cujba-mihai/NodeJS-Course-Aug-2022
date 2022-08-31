const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://mihaicujba:jaVZUnqSHW0U4iFw@mongocourseecommerce.5cs6cdh.mongodb.net/?retryWrites=true&w=majority'
  )
    .then(client => {
      console.assert(client.s.options.dbName.length <= 0, 'Connected to MongoDb!')
      console.assert(client.s.options.dbName.length > 0, 'Could not connect to MongoDb!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
    });
}; 

const getDb = () => {
  if(_db) {
    return _db;
  }

  throw 'No database found';
}

module.exports = mongoConnect;
module.exports = getDb;