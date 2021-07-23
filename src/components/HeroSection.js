import React, {useState} from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import Typewriter from "typewriter-effect"

import {
    InputGroup,
    Input,
    InputGroupAddon,
    FormGroup,
    Label,
    Spinner
  } from 'reactstrap';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.min.css';
  import axios from 'axios';
  import BookCard from './BookCard';

function HeroSection() {

    // Setting states
    const [maxResults, setMaxResults] = useState(10);
    const [startIndex, setStartIndex] = useState(1);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [cards, setCards] = useState([]);
    
  // Handling Google Books API and the search function
  const handleSubmit = () => {
    setLoading(true);
    if (maxResults > 40 || maxResults < 1) {
      toast.error('max results must be between 1 and 40');
    } else {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}`
        )
        .then(res => {
          if (startIndex >= res.data.totalItems || startIndex < 1) {
            toast.error(
              `max reults must be between 1 and ${res.data.totalItems}`
            );
          } else {
            if (res.data.items.length > 0) {
              setCards(res.data.items);
              setLoading(false);
            }
          }
        })
        .catch(err => {
          setLoading(true);
          console.log(err.response);
        });
    }
  };

  // Display container
  const mainHeader = () => {
    return (
      <div className='hero-container'>
          <video src= '/videos/video1.mp4' autoPlay loop muted />
            <h1><Typewriter onInit = {(typewriter) => {
                typewriter
                .typeString("READ.<br>")
                .pauseFor(800)
                .typeString("RATE.<br>")
                .pauseFor(800)
                .typeString("RECOMMEND.")
                .pauseFor(800)
                .start();
                }}
            /></h1>
            <p>Search and share your experience with books you have read.</p>

        {/* Overlay */}
        
        <div style={{ width: '60%', zIndex: 2 }}>
          <InputGroup size='lg' className='mb-3'>
            <Input
              placeholder='Enter ISBN or Book Title'
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <InputGroupAddon addonType='append'>
            <Button className="btns" buttonStyle='btn--outline'
                buttonSize='btn--large'onClick={handleSubmit}>SEARCH <i className='fas fa-search' />
                </Button>
            </InputGroupAddon>
          </InputGroup>
          <div className='max-index-wrapper'>
            <FormGroup className="max-index-value">
              <Label for='maxResults'>Max Results</Label>
              <div style={{ width: '30%', zIndex: 2 }}>              
              <Input
                type='number'
                id='maxResults'
                placeholder='Max Results'
                value={maxResults}
                onChange={e => setMaxResults(e.target.value)}
              />
              </div>
            </FormGroup>
            <FormGroup className='max-index-value'>
              <Label for='startIndex'>Start Index</Label>
              <div style={{ width: '30%', zIndex: 2 }}>   
              <Input
                type='number'
                id='startIndex'
                placeholder='Start Index'
                value={startIndex}
                onChange={e => setStartIndex(e.target.value)}
              />
            </div>
            </FormGroup>
          </div>
        </div>
      </div>
    );
  };

  const handleCards = () => {
    
    if (loading) {
        return (
                <div className='d-flex justify-content-center mt-2'>
                    <Spinner style={{ width: '3rem', height: '3rem' }} />
                </div>
        );
    } else {
      const items = cards.map((item, i) => {
        let thumbnail = '';
        if (item.volumeInfo.imageLinks) {
          thumbnail = item.volumeInfo.imageLinks.thumbnail;
        }

        return (
            <div className='col-4 mt-5'>                      
                <div className='book__cards' key={item.id}>
                    <BookCard
                    thumbnail={thumbnail}
                    title={item.volumeInfo.title}
                    pageCount={item.volumeInfo.pageCount}
                    language={item.volumeInfo.language}
                    authors={item.volumeInfo.authors}
                    publisher={item.volumeInfo.publisher}
                    description={item.volumeInfo.description}
                    previewLink={item.volumeInfo.previewLink}
                    infoLink={item.volumeInfo.infoLink}           
                    />
                </div>
            </div>
                  
        
            
        );
      });
     
      return (
        <div className='cards-container'>
          <div className='row'>{items}</div>
        </div>
      );
    }
  };

    return (
        <div>
                {mainHeader()}
                {handleCards()}
                <ToastContainer/>
        </div>
    )

    
}

export default HeroSection;
