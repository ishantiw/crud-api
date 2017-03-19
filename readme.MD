# API for CRUD operation on In-memory and Persistant Storage
This API works on data stored in In-Memory for which we are uisng [NeDB](https://github.com/louischatriot/nedb) database for which we have defined schema and connection under `/model/nedbModel`. 
We are using [modli](https://github.com/node-modli/modli) as an API to define the schema and the crud operation. This was the initial goal of this project. 
The next step was to save this data on persistant storage for which we have used [MongoDB](https://www.mongodb.com/) and using [Mongoose](http://mongoosejs.com/) for data modeling which is under `/model/mongodbModel`.


[![Build Status](https://travis-ci.org/ishantiw/crud-api.svg?branch=master)](https://travis-ci.org/ishantiw/crud-api)

## Projects directory
     .
    ├── model                  # Datamodel for different databases
    ├── operations             # methods corresponding to CRUD for different databases
    ├── test                   # Automated tests, I have used Mocha and chai
    ├── view                   # To display pages
    ├── .travis.yml            # Continuos integration using Travis on GitHub
    ├── CRUD.js                # server using express
    ├── .gitignore
    ├── package.json
    └── README.md

## How to use?
I have used a simple application to test the working of CRUD. The application is about Celebrity Character Profile Management. 
You add a character name, tv show and celeb id for internal purpose but not very relevant. You can add a celeb and query with celeb name using the homepage. Its deployed in Heroku and you can use it here https://ishan-crud-api.herokuapp.com
- Clone the repository and run `npm install`
Using below scripts to run different features,
- `npm run bothmem` - to perform CRUD on both inMemory and persistant storage.
- `npm run inmem` - to perform CRUD only on inMemory
- `npm test` -  to run the tests
As soon as you run the above commands you can now go to http://localhost:3000 to access the homepage of the app.

## Testing 
Using Mocha and Chai as they have asynch support including promises. I have used Postman to make fast HTTP requests to the api to check if all the HTTP requests are working fine.
I have used describe blocks of code to better organize assertions and so organizing the output when you run the test. 
### Things which can be done to improve

- we can also mongodb mock ups to test instead of creating a real connection and playing with real database.
- Could's done more indepth response testing, like what are the properties and what is the value.(I was sending HTML responses which were difficult to test, I only changed it for GET method)

## API Versioning
The URI design should have less constraints or independent and it should be preserved over time, especially when the lifespan of an API is longer which means greater commitment to the users of API.
One solution is to put api versions in the URI. For example, http://ishantiw.com/api/v7/celebs/1234. Or the custom header request which will accept a particular version of api.
For example,
`HTTP GET:`
`https://ishantiw.com/api/celebs/1234`
`api-version: 2`
In API we can have a version route where we pass in the route along with the version.
`VersionRouter("api/celebs/{id}", 3)`
`Route("api/v3/celebs/{id}")`

## GraphQL API instead of REST API
GraphQL certainly gives power to the clients. Although with REST API you can query the api using query string('?emp_id=1234' or '?emp_status=active'). 
On the other hand GraphQL, specifies the height of the resource we like to see. Something like below.
```
{
  "data": {
    "human": {
      "name": "Luke Skywalker",
      "height": 5.6430448
    }
  }
}
```
So GraphQL gives a query language syntax and the SDKs for your programming language to fetch the right models.
The best feature about GraphQL is monitoring field usage easy at technical level as it forces its client to specify the fields they want to be returned in the query.
```
POST /graphql HTTP/1.1
Host: localhost:3000
Content-Type: application/graphql

{
  celeb(id: "123") {
    character,
    tvshow,
    id
  }
}
```
Here, REST works a little different as it makes endpoints available via '/getceleb/tony' for which they would be any field in response, 
so if develpors want to get rid of 'character' field then how would they know which clients are using this field. Well there are many approaches to overcome this by making a new endpoint 
'/v3/getceleb/tony' and tell people to use this, or by sending emails who signed up using Oauth, etc. All these approaches suffer from version overkill for a small change.
GraphQL can play an important role here as it can track the field usage and reach out to only those clients which were using it. So it does make field deprecation easier. 
Also GraphQL increases the peformance of the client by querying the smallest resource possible. Although we can use string query to get partial results in REST but still some bits are always transferred over the wire than with the GraphQL.
