import "../App.css";

import {useState} from "react";
import {gql} from "apollo-boost";
import {graphql} from "react-apollo";
import {flowRight as compose} from "lodash";

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`

const addBookMutation = gql`
    mutation($name : String!, $genre : String!, $authorId : ID!) {
        addBook(name : $name, genre : $genre, authorId : $authorId){
            name
            id
        }
    }
`

const AddBook = (props) => {
    const [book, setBook] = useState({
        name : "",
        genre : "",
        authorId : ""
    });

    const displayAuthors = () => {
        var data = props.getAuthorsQuery;
        if(data.loading) {
            return(
                <option disabled>Loading authors...</option>
            );
        }else{
            return data.authors.map((author) => {
                return(
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            })
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        props.addBookMutation({
            variables : {
                name : book.name,
                genre : book.genre,
                authorId : book.authorId
            },
            refetchQueries : [{query : getBooksQuery}]
        });
        setBook({
            name : "",
            genre : "",
            authorId : "" 
        });
    }
    return(
        <>
            <form onSubmit={submitHandler}>
                <div className="field">
                    <label>Book name :</label>
                    <input type="text" value={book.name} onChange={(e) => setBook({...book, name : e.target.value})} />
                </div>
                <div className="field">
                    <label>Genre :</label>
                    <input type="text" value={book.genre} onChange={(e) => setBook({...book, genre : e.target.value})} />
                </div>
                <div className="field">
                    <label>Author :</label>
                    <select onChange={(e) => setBook({...book, authorId : e.target.value})}>
                        <option>Select Author</option>
                        {displayAuthors()}
                    </select>
                </div>
                <button type="submit">+</button>
            </form>
        </>
    )
}

export default compose(
    graphql(getAuthorsQuery, {name : "getAuthorsQuery"}),
    graphql(addBookMutation, {name : "addBookMutation"})
)(AddBook);