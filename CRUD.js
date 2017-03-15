'use strict'
/**
 * Interface to perform CRUD on In-memory and persistence storage
 * @author Ishan Tiwari <ishan210788@gmail.com>
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Separate class to include all the crud operations on MongoDB persistent database
const PersistenceOperations = require('./operations/persistentDBOperations');
const persistenceOps = new PersistenceOperations();

//Separate class to include all the crud operations in NEDB in-memory database
const CrudOperations = require('./operations/crudOperations');
const crudOps = new CrudOperations();

//Middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

//Server started
app.listen(8080, () => {
    console.log('listening on 8080...')
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/index.html');
});

app.get('/getceleb', (req, res) => {
    const celebName = req.query.cname;
    //saving in-memory
    crudOps.read(celebName).then((celebs) => {
        if (celebs.length == 0) {
            console.log(`In-Memory: No celebrity with character name "${celebName}"`)
        } else {
            console.log(`In-Memory: Found ${celebs.length} number of celebrities with character name "${celebName}"`);
        }
    }).catch((err) => console.log(err))

    //saving in persistent storage
    persistenceOps.read(celebName).then((celebs) => {
        if (celebs.length == 0) {
            res.send(`<p><h3>For celeb name "${celebName}", there are no characters,</h3> <br> Please click <a href="/">here</a> to go back`)
            return;
        }
        let html = `<p><h3>For celeb name "${celebName}" we have following charaters,</h3> <ul>`;
        for (let celeb of celebs) {
            html += `<li> <b>Charater Name:</b> ${celeb.cname}`;
            html += `, <b>TV Show:</b> ${celeb.tvshow}`;
            html += `, <b>ID:</b> ${celeb.id} </li>`;
        }
        html += `</p> <br> Please click <a href="/">here</a> to go back`;
        res.send(celebs);
    }).catch((err) => console.log(err));
})

app.post('/addceleb', (req, res) => {
    const celeb = req.body;
    const celebID = parseInt(req.body.id);
    const celebName = celeb.cname;
    const celebTvshow = celeb.tvshow;

    //saving in-memory
    crudOps.add(celebID, celebName, celebTvshow).then((result) => {
        if (result) {
            console.log(`In-Memory: Successfully added "${celebName}"`)
        } else {
            console.log(`In-Memory: Internal Error -> Couldnt save to in-memory`);
        }
    }).catch((err) => console.log(err));

    //saving in persistent storage
    persistenceOps.add(celebID, celebName, celebTvshow).then((result) => {
        if (result) {
            res.send(`<h3>Added celeb with character name ${celeb.cname} </h3> <br> Please click <a href="/">here</a> to go back`);
        }
    }).catch((err) => console.log(err))
})

app.delete('/delceleb', (req, res) => {
    const celebID = req.query.id;
    //saving in-memory
    const result = crudOps.delete(celebID);
    result.then((deletedCeleb) => {
        console.log(`In-Memory: "${deletedCeleb}" celebrity removed`);
    }).catch((err) => console.log(err))

    //saving in persistent storage
    persistenceOps.delete(celebID).then((result) => {
        res.send(`<h3>Deleted celeb with id ${result._id} </h3> <br> Please click <a href="/">here</a> to go back`);
    }).catch((err) => console.log(err))
});

app.put('/updceleb', (req, res) => {
    const celebID = req.query.id
    const celebName = req.query.cname;
    const celebTvshow = req.query.tvshow;
    const celebNumber = parseInt(req.query.cnum);

    //saving in-memory
    const celebData = {
        id: celebNumber,
        cname: celebName,
        tvshow: celebTvshow
    };
    crudOps.update(celebData.id, celebData).then((updatedCeleb) => {
        console.log(`In-Memory: The celebrity with "${updatedCeleb}" is updated`);
    }).catch((err) => console.log(err))

    //saving in persistent storage
    persistenceOps.update(celebID, celebData).then((updatedCeleb) => {
        res.send(`<h3>Updated celeb with id ${celebID}</h3> Details are <br> <ul><li>Name: ${celebName}, TV Show: ${celebTvshow}, Celeb ID ${celebNumber}  </li></ul> <br> Please click <a href="/">here</a> to go back`);
    }).catch((err) => console.log(err));
});
module.exports = app;