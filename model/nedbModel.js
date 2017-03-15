/**
* Using modli(http://node-modli.github.io/modli/) to create data schema for NeDB database
* @author Ishan Tiwari <ishan210788@gmail.com>
*/

const modli = require('modli');
const nedb = require('modli-nedb');


modli.adapter.add({
  name: 'modliNeDB',
  source: nedb,
  config: {
    inMemoryOnly: true
  }
});

// Add a data model
modli.model.add({
  name: 'inMemoryDB',
  tableName: 'celeb',
  version: 1,
  schema: {
    id: { type: 'number', required: true },
    cname: { type: 'string' },
    tvshow: { type: 'string' }
  }
});
// Create an instance of the datasource object with the Model and Adapter
const myDataSource = modli.use('inMemoryDB', 'modliNeDB');
module.exports = myDataSource;