import "../App.css";
import BookDetail from "./BookDetail";

import {gql} from "apollo-boost";
import {graphql} from 'react-apollo';
import {useState} from "react";

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`

const BookList = (props) => {
    const [selectedBookId, setSelectedBookId] = useState(null);

    const displayBooks = () => {
        var data = props.data;
        if(data.loading) {
            return(
                <div>Loading books...</div>
            );
        }else{
            return data.books.map((book) => {
                return(
                    <li className="book_item" key={book.id} onClick={(e) => setSelectedBookId(book.id)}>{book.name}</li>
                )
            })
        }
    }
    return(
        <div className="book_part">
            <div className="books">
                <h1 className="heading">Raju's Reading List</h1>
                <ul className="book_list">
                    {displayBooks()}
                </ul>
            </div>
            <div className="details">
                <BookDetail selectedBookId={selectedBookId} />
            </div>
        </div>
    )
}

export default graphql(getBooksQuery)(BookList);