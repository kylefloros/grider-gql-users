const graphql = require('graphql');
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema //Takes root query and returns schema instance
} = graphql;

// const users = [
//     { 
//         id: '23', 
//         firstName: 'Bill', 
//         age: 20
//     },
//     { 
//         id: '47', 
//         firstName: 'Samantha', 
//         age: 21 
//     }
// ]

const UserType = new GraphQLObjectType({
    name: 'User', //required
    fields: { //required
        id: { type: GraphQLString } ,
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: { //If you're looking for a user give me id and I'll give you back UserType
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                //Go through users, find user with id = ags.id
                //return _.find(users, { id: args.id });
                return axios.get(`http://localhost:3000/users/${args.id}`)
                //.then(response => console.log(response)) //{data: {firstName: 'bill'}}
                .then(resp => resp.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})

