const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// rollDice is a function that has two parameters that could be passed through to it in the root resolver. We are declaring it her.
const schema = buildSchema(`
    type Query{
        rollDice(numDice: Int!, numSides: Int): [Int]
        
    }
`)

const root = {
    rollDice: (args) => {
        let output = [];
        for (let i = 0; i < args.numDice; i++) {
            output.push(1 + Math.floor(Math.random() * (args.numSides || 6)))
        }
        return output
    }
}

const server = express();
server.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

const port = 4000
server.listen(port, () => {
    console.log(`Running a GraphQL API server at localhost:4000/graphql`)
})