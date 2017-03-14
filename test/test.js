'use strict';
/**
 * Testing CRUD operations using in-memory and persistant storage. 
 * Karma as test runner
 * chai as an assertion library
 * @author Ishan Tiwari <ishan210788@gmail.com>
 */
process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
const expect = require('chai').expect;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let chaiHttp = require('chai-http');
const PersistenceOperations = require('../operations/persistentDBOperations');
const persistenceOps = new PersistenceOperations();
chai.use(chaiHttp);
const server = require('../CRUD');
let should = chai.should();

//Our parent block
describe('Celebs', () => {
  beforeEach((done) => { //Before each test we empty the database
    mongoose.disconnect();
    done();
  });

  describe('/GET celeb', () => {
      it('it should get all the celebs by name', (done) => {

        let celebName = 'Tony';
        chai.request(server)
          .get('/getceleb' + '?cname=' + celebName)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].should.have.property('tvshow');
            done();
          })
      })
    }),

    describe('/POST celeb', () => {

      it('saving a new celeb', (done) => {

        let celeb = {
          id: '12345',
          cname: 'Tony',
          tvshow: 'Sopranos'
        }
        chai.request(server)
          .post('/addceleb')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send(celeb)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
      });
    }),

    describe('/DELETE celeb', () => {
      it('it should delete a celeb by id', (done) => {
        let celebID = '58c72c2d971bf244b868ab86';
        chai.request(server)
          .delete('/delceleb' + '?id=' + celebID)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object')
            done();
          });
      });
    })

  describe('/PUT celeb', () => {

    it('it should update a celeb by taking its id', (done) => {
      let celeb = {
        id: '58c729c1271f4d4309d315f3',
        cnum: '54321',
        cname: 'Pauline',
        tvshow: 'Sopranos'
      };
      let celebID = 'id=58c729c1271f4d4309d315f3&cnum=54321&cname=Pauline&tvshow=Sopranos';
      chai.request(server)
        .put('/updceleb?' + celebID)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  })

});