const graphql = require("graphql");
const Author = require("../model/Author");
const Book = require("../model/Book");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLInt } = graphql;

// Dummy data
// var books = [
//     {name : "Loo", genre : "fiction", id : "1", authorId : "1"},
//     {name : "Khusi", genre : "self-help", id : "2", authorId : "2"},
//     {name : "Palpasa cafe", genre : "fantacy", id : "3", authorId : "3"},
//     {name : "Koriyan", genre : "fiction", id : "4", authorId : "3"},
//     {name : "Sambanda", genre : "essay", id : "5", authorId : "2"},
//     {name : "Summer love", genre : "fantacy", id : "6", authorId : "4"},
//     {name : "Saya", genre : "modern-fiction", id : "7", authorId : "4"},
//     {name : "Moonson", genre : "fiction", id : "8", authorId : "4"},
//     {name : "Radha", genre : "mythological-fiction", id : "9", authorId : "5"},
//     {name : "Jhola", genre : "social-fiction", id : "10", authorId : "5"}
// ];

// var authors = [
//     {name : "Nayan Raj Pandey", age : 56, id: "1"},
//     {name : "Bijay kumar pandey", age : 62, id : "2"},
//     {name : "Narayan Wagle", age : 55, id : "3"},
//     {name : "Subin Bhattrai", age : 38, id : "4"},
//     {name : "Krishna Dharabasi", age : 65, id : "5"}
// ]

const BookType = new GraphQLObjectType({
    name : "Book",
    fields : () => ({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        genre : {type : GraphQLString},
        author : {
            type : AuthorType,
            resolve(parent, args){
                // return _.find(authors, {id : parent.authorId});
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name : "Auther",
    fields : () => ({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        age : {type : GraphQLString},
        books : {
            type : new GraphQLList(BookType),
            resolve(parent, args) {
                // return _.filter(books, {authorId : parent.id})

                return Book.find({authorId : parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name : "RootQueryType",
    fields :{
        book : {
            type : BookType,
            args : {id : {type : GraphQLID}},
            resolve(parent, args) {
                // return _.find(books, {id : args.id});
                return Book.findById(args.id);
            }
        },
        author : {
            type : AuthorType,
            args : {id : {type : GraphQLID}},
            resolve(parent, args) {
                // return _.find(authors, {id : args.id})
                return Author.findById(args.id);
            }
        },
        books : {
            type : new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({});
            }
        },
        authors : {
            type : new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({});
            }
            
        }
    }
});

const Mutation = new GraphQLObjectType({
    name : "Mutation",
    fields : {
        addAuthor : {
            type : AuthorType,
            args : {
                name : {type : GraphQLString},
                age : {type : GraphQLInt}
            },
            resolve(parent, args) {
                let author = new Author({
                    name : args.name,
                    age : args.age
                });

                return author.save();
            }
        },
        addBook : {
            type : BookType,
            args : {
                name : {type : GraphQLString},
                genre : {type : GraphQLString},
                authorId : { type : GraphQLID }
            },
            resolve(parent, args) {
                let book = new Book({
                    name : args.name,
                    genre : args.genre,
                    authorId : args.authorId
                });
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
});