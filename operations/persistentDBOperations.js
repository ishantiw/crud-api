'use strict';
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

    add(celebID, celebName, celebTvshow) {
        return new Promise((resolve, reject) => {
            this.mongoose.connect(this.mongoURL, (err) => {
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

    read(celebName) {
        return new Promise((resolve, reject) => {
            this.mongoose.connect(this.mongoURL, (err) => {
                CelebModel.find({
                    cname: celebName
                }, (err, celebs) => {
                    if (err) reject(err);
                    resolve(celebs);
                })
            })
        })
    }

    delete(celebID) {
        return new Promise((resolve, reject) => {
            this.mongoose.connect(this.mongoURL, (err) => {
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

    update(celebID, celebData) {
        return new Promise((resolve, reject) => {
            this.mongoose.connect(this.mongoURL, (err) => {
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