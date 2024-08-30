import { GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLNonNull } from 'graphql';
// import { todos } from './sampleData.js';
import Todo from './Todo.js'

const TodoType = new GraphQLObjectType({
    name: 'Todo',
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
    }
});

const RootQueryType   
 = new GraphQLObjectType({
    name: 'Query',
    fields: {
        todos: {
            type: new GraphQLList(TodoType),   

            resolve: (root, args) => {
                // return todos
                return Todo.find();
            }
        },
        todo:{
            type:TodoType,
            args:{id:{type:GraphQLID}},
            resolve: (parent, args) => {
                // return todos.find(todo => todo.id === args.id)
                return Todo.findById(args.id)
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addTodo:{
            type: TodoType,
            args:{
                title:{type: GraphQLNonNull(GraphQLString)},
                completed: {type: GraphQLNonNull(GraphQLBoolean)},
            },
            resolve(parent,args) {
                const todo = new Todo({
                    title:args.title,
                    completed:false
                })
                return todo.save()
            }
        },
        deleteTodo:{
            type: TodoType,
            args:{
                id:{type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent,args) {
                return Todo.findByIdAndRemove(args.id)
            }
        },
        updateTodo:{
            type: TodoType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)},
                title:{type:GraphQLString}
            },
            resolve(parent, args){
                return Todo.findByIdAndUpdate(
                    args.id,
                    {
                        $set:{
                            title:args.title
                        }
                    }
                )
            }
        },
        toggleTodo:{
            type:TodoType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)},
            },
            async resolve(parent, args){
                const todo = await Todo.findById(args.id)
                return Todo.findAndUpdate(
                    args.id,
                    {
                        $set:{
                            completed:!completed
                        }
                    }
                )
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: mutation // If `mutation` is defined as a separate variable, ensure it's included correctly.
});

export default schema















// import express from 'express'; // You need to import express
// import { graphqlHTTP } from 'express-graphql';
// import { GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLList } from 'graphql';
// import { todos } from './sampleData.js';

// // Initialize Express
// const app = express();
// const port = process.env.PORT || 9000;

// /**
//  * Define the fields and types of the Todo object, as well as any relationships it has with other types in the schema.
//  */
// const TodoType = new GraphQLObjectType({
//     name: 'Todo',
//     fields: {
//         id: { type: GraphQLID },
//         title: { type: GraphQLString },
//         completed: { type: GraphQLBoolean },
//     }
// });

//     /**
//      * Define a query to fetch todos. This will create a query schema for a Todo object type in GraphQL.
//      */
//     const RootQueryType = new GraphQLObjectType(
//         {
//             name: 'Query',
//             fields: {
//                 todos: {
//                     type: new GraphQLList(TodoType),
//                     resolve: (root, args) => {
//                         return todos;
//                     }
//                 }
//             }
//         }
//     );

//     /**
//      * Create the GraphQL schema using the RootQueryType.
//      */
//     const schema = new GraphQLSchema({
//         query: RootQueryType
//     });

// /**
//  * Set up the /graphql endpoint with express-graphql middleware.
//  */
// // app.use('/graphql', graphqlHTTP({
// //     schema: schema, // You need to pass the schema here
// //     graphiql: process.env.NODE_ENV === 'development'
// // }));

// /**
//  * Start the Express server.
//  */
// // app.listen(port, () => console.log(`Server running on port ${port}`));

// export  {schema}