const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const app = express();


///.use is wiring middleware to express server
// expressGraphQL is the options object
app.use('/graphql', expressGraphQL({
    //schema: schema,
    schema,
    graphiql: true
}));

//express http server
app.listen(4000, () => {
    console.log('Listening');
});

