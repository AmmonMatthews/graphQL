const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql')

// Declaring the schema for the API
var schema = buildSchema(`
    type Query {
        quoteOfTheDay: String
        random: Float!
        rollThreeDice: [Int]
    }
`);

//Create a root object that has a resolver function for each key in the Schema objects.
var root = {
    quoteOfTheDay: () => {
        return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
    },

    random: () => {
        return Math.random();
    },

    rollThreeDice: () => {
        return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6))
    },
};

//Create the server and endpoint

const app = express();
//enpoint creation is the last part of the url and the express-graphql being used with a object passed through with the schema and root resolvers being passed through. 
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}))

const port = 4000
app.listen(port, () => {
    console.log('Running a GraphQL API server at http://localhost:4000/graphql')
})