import "../App.css";

import {gql} from "apollo-boost";
import {graphql} from "react-apollo";

const getBookDetailQuery = gql`
    query($id : ID) {
        book(id : $id) {
            id
            name
            genre
            author {
                id
                name
                books{
                    id
                    name
                }
            }
        }
    }
`

const BookDetail = (props) => {
    const displayBookDetail = () => {
        const {book} = props.data;
        if(book) {
            return(
                <div>
                    <h2>{book.name}</h2>
                    <p> {book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul>
                        {book.author.books.map((item) => {
                            return <li key={item.id}>{item.name}</li>
                        })}
                    </ul>
                </div>
            )
        }else{
            return(
                <div>
                    <p>No book selected...</p>
                </div>
            )
        }
    }
    return (
        <>
            <div>
                {displayBookDetail()}
            </div>
        </>
    )
}

export default graphql(getBookDetailQuery, {
    options : (props) => {
        return {
            variables : {
                id : props.selectedBookId
            }
        }
    }
})(BookDetail);