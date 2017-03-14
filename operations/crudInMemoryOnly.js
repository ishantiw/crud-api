'use strict'
/**
* Interface to perform CRUD on In-memory only using NeDB database
* @author Ishan Tiwari <ishan210788@gmail.com>
*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

//Separate class to include all the crud operations in NEDB in-memory database
const CrudOperations = require('./crudOperations');
const crudOps = new CrudOperations();

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));

//Server
app.listen(3000, () => {
    console.log('listening on 3000...')
});
//Main Page
app.get('/', (req, res) => {
    res.sendFile('/index.html' , { root: path.join(__dirname, '../view')});
});
//Read operation
app.get('/getceleb', (req, res) => {
    const celebName = req.query.cname;
    let result = crudOps.read(celebName);
    result.then((celebs) => {
        if (celebs.length == 0) {
            return console.log(`No celebrity with character name ${req.query.cname}`)
        }
        let html = `<p>For celeb name " ${req.query.cname} " we have following celebrities, <br>`;
        for (let celeb of celebs) {
            html += `<br> Charater Name:  ${celeb.cname}`;
            html += `, TV Show:  ${celeb.tvshow}`;
            html += `, ID:  ${celeb.id}`;
        }
        html += `</p> <br> Please click <a href="/">here</a> to go back`;
        res.send(html);
    })
})
//Create Operation
app.post('/addceleb', (req, res) => {
    const celeb = req.body;
    const celebID = parseInt(celeb.id);
    crudOps.add(celebID, celeb.cname, celeb.tvshow);
    res.send(`The celebrity with name "${celeb.cname}" was added successfully <br> Please click <a href="/">here</a> to go back`);
})
//Delete Operation
app.delete('/delceleb', (req, res) => {
    const celebID = parseInt(req.query.id);
    const result = crudOps.delete(celebID);
    result.then((deletedCeleb) => {
        console.log(deletedCeleb);
        res.send(`The celebrity with "${deletedCeleb}" is removed`);
    })
})
//Update Operation
app.put('/updceleb', (req, res) => {
    const celebID = parseInt(req.query.id);
    const celebData = {
        id: celebID,
        cname: req.query.cname,
        tvshow: req.query.tvshow
    };
    const result = crudOps.update(celebID, celebData);
    result.then((updatedCeleb) => {
        console.log(updatedCeleb);
        res.send(`The celebrity with "${updatedCeleb}" is updated`);
    })
        .catch((err) => {
            console.log(err);
        })
});

