import React,{Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Listbook from './Listbook';
import {BrowserRouter,Route} from 'react-router-dom';
import Search from './Search';

class BooksApp extends Component {
  constructor(props){
    super(props)
    this.state={
      books:[],
      searchTerm:''
    }
  }
  
  componentDidMount(){
      BooksAPI.getAll().then((books)=>{
      this.setState(
        {
        books:books
      })
    }
      )
  }

  moveShelf = (book,shelf)=>{
    BooksAPI.update(book,shelf);
    BooksAPI.getAll().then(books=>
      this.setState({
        books:books
      })
      )
  }
  // moveShelf =(book,shelf) => {
  //   BooksAPI.update(book,shelf);
    

  // }

  render() {
    const {books} = this.state;
    // console.log(book);
    return (
      <div className="app">
           <BrowserRouter>
           <div>
             <Route 
             exact 
             path="/search" 
             render={()=>( 
             <Search moveShelf = {this.moveShelf}/>
             )}/>
             <Route 
             exact 
             path="/" 
             render={
               ()=>(
                 <Listbook 
                 books={books}
                 moveShelf = {this.moveShelf}
                 />
               )
              }
            
             />
           </div>
           </BrowserRouter>
        }
      </div>  
      ) } }

export default BooksApp
