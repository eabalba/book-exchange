import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out today's recommendations!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src = 'images/img-5.jpg'
              text='Get lost in a world exploration while gather new experiences. Your very own adventure awaits!'
              label='Adventure'
              path='/'
            />
             <CardItem
              src='images/img-2.jpg'
              text="Lighting a spark in everyone's heart, one happy ending at a time."
              label='Romance'
              path='/'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-7.jpg'
              text="Mystery? Suspense? Who doesn't love a good brain teaser?"
              label='Mystery'
              path='/'
            />
            <CardItem
              src='images/img-4.jpg'
              text="Are you brave enough? If you think you are, then come see what's lurking within."
              label='Horror'
              path='/'
            />
           <CardItem
              src = 'images/img-6.jpg'
              text='Travel through time and take a trip to the future with our top-rated Science Fiction books'
              label='Sci-fi'
              path='/'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;