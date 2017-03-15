/**
* Class having functions for performing CRUD operation for In-memory database NeDB
* @author Ishan Tiwari <ishan210788@gmail.com>
*/

const myDataSource = require('../model/nedbModel');

class CrudOperations {
    constructor () {

    }
/**
   * A function that takes details of a celeb and return promise with value true
   * @param {number}      id      A number which tells the id of a celeb
   * @param {string}      cname    Name of the celebrity
   * @param {string}      tvshow  Name of the TV show for a celeb
   * @returns  {promise}    promise A promise object that resolves 'true' if the insertion was successful
*/
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
/**
   * A function that takes the name of a celeb and returns one or more celeb names that are matched 
   * @param {string}      name    Name of the celebrity
   * @returns  {promise}    promise  A promise object which resolves all the celebrities matched
*/
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
/**
   * A function that takes the name of a celeb and returns one or more celeb names that are matched 
   * @param {string}      id    Internal mongodb ID for a record of celeb
   * @returns  {promise}    promise  A promise object which resolves the deleted celeb
*/
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
/**
   * A function that takes the name of a celeb and returns one or more celeb names that are matched 
   * @param {string}      id    Name of the celebrity
   * @param {object}      celebData    An object that contains celebName, celebNumber and celebTvshow
   * @returns  {promise}    promise  A promise object which resolves the updated celebrity
*/
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