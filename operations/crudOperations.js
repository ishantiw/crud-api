'use strict';
/**
* Class having functions for performing CRUD operation for In-memory database NeDB
* @author Ishan Tiwari <ishan210788@gmail.com>
*/

const myDataSource = require('../model/nedbModel');

class CrudOperations {
    constructor () {

    }

    add(id, cname, tvshow) {
        return myDataSource.create({
            id: id,
            cname: cname,
            tvshow: tvshow
        })
            .then((result) => {
                return true;
            })
            .catch((err) => {
                console.log('Error from NeDB:', err);
                return false;
            });
    }

    read(name) {
        return myDataSource.read({ cname: name })
            .then((results) => {
                return results;
            })
            .catch((err) => {
                console.log('Error from NeDB:', err);
                return false;
            });
    }

    delete(id) {
        return myDataSource.delete({ id: id })
            .then((results) => {
                console.log('Success from NeDB:', results)
                return results;
            })
            .catch((err) => {
                console.log('Error from NeDB:', err);
            });
    }

    update(id, celebData) {
        return myDataSource.update({id: id}, celebData)
            .then((results) => {
                console.log('Success from NeDB:', results)
                return results;
            })
            .catch((err) => {
                console.log('Error from NeDB:', err);
            });
    }
}
module.exports = CrudOperations;