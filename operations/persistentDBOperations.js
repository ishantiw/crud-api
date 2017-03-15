/**
 * Class having functions for performing CRUD operation for In-memory database NeDB
 * @author Ishan Tiwari <ishan210788@gmail.com>
 */

const myDataSource = require('../model/mongodbModel');
const mongoose = myDataSource.mongoose;
const mongoURL = myDataSource.mongoURL;
const celebSchema = myDataSource.celebSchema;

//Mongoose automatically looks for the plural version of your model name, so it will make collection named 'celebs'
const CelebModel = mongoose.model('celeb', celebSchema);

class PersistentCrudOperations {
    constructor() {
        this.mongoose = mongoose;
        this.mongoURL = mongoURL;
        this.celebModel = CelebModel;

    }
/**
   * A function that takes details of a celeb and return promise with value true
   * @param {number}      celebID      A number which tells the id of a celeb
   * @param {string}      celebName    Name of the celebrity
   * @param {string}      celebTvshow  Name of the TV show for a celeb
   * @returns  {promise}    promise A promise object that resolves 'true' if the insertion was successful
*/
    add(celebID, celebName, celebTvshow) {
        return new Promise((resolve, reject) => {
            this.mongoose.createConnection(this.mongoURL, (err) => {
                if (err) return console.log(err)

                let celebInstance = new CelebModel();
                celebInstance.id = celebID;
                celebInstance.cname = celebName;
                celebInstance.tvshow = celebTvshow;
                celebInstance.save((err) => {
                    if (err) reject(err);

                    resolve(true);
                })
            })
        });
    }
/**
   * A function that takes the name of a celeb and returns one or more celeb names that are matched 
   * @param {string}      celebName    Name of the celebrity
   * @returns  {promise}    promise  A promise object which resolves all the celebrities matched
*/
    read(celebName) {
        return new Promise((resolve, reject) => {
            this.mongoose.createConnection(this.mongoURL, (err) => {
                CelebModel.find({
                    cname: celebName
                }, (err, celebs) => {
                    if (err) reject(err);
                    resolve(celebs);
                })
            })
        })
    }
/**
   * A function that takes the name of a celeb and returns one or more celeb names that are matched 
   * @param {string}      celebID    Internal mongodb ID for a record of celeb
   * @returns  {promise}    promise  A promise object which resolves the deleted celeb
*/
    delete(celebID) {
        return new Promise((resolve, reject) => {
            this.mongoose.createConnection(this.mongoURL, (err) => {
                CelebModel.findById(celebID, (err, celeb) => {
                    if (err) reject(err);

                    celeb.remove((err, celeb) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(celeb);
                        }
                    })
                })
            })
        });
    }
/**
   * A function that takes the name of a celeb and returns one or more celeb names that are matched 
   * @param {string}      celebName    Name of the celebrity
   * @param {object}      celebData    An object that contains celebName, celebNumber and celebTvshow
   * @returns  {promise}    promise  A promise object which resolves the updated celebrity
*/
    update(celebID, celebData) {
        return new Promise((resolve, reject) => {
            this.mongoose.createConnection(this.mongoURL, (err) => {
                CelebModel.findById(celebID, (err, celeb) => {
                    if (err) reject(err);

                    celeb.update({
                        id: celebData.id,
                        cname: celebData.cname,
                        tvshow: celebData.tvshow
                    }, (err, celeb) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(celeb);
                        }
                    })
                })
            })
        });
    }
}
// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose connections disconnected through Node app termination');
        process.exit(0);
    });
});

module.exports = PersistentCrudOperations;