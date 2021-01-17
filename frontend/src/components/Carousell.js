import Slide from "./Slide"
import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState } from 'react'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,

} from 'reactstrap'

const Carousell = () => {
  const items = [
    [
      {
        src: "./assets/Cuzco.jpg",
        altText: 'Cuzco',
      },
      {
        src: "./assets/Riodejaneiro.jpg",
        altText: 'Rio de Janeiro',
      },
      {
        src: "./assets/Calafate.jpg",
        altText: 'The Calafate',
      },
      {
        src: "./assets/Cancun.jpg",
        altText: 'Cancun',
      }
    ],

    [{
      src: "./assets/Berlin.jpg",
      altText: 'Berlín',
    },
    {
      src: "./assets/Atenas.jpg",
      altText: 'Atenas',
    },
    {
      src: "./assets/Praga.jpg",
      altText: 'Praga',
    },
    {
      src: "./assets/Estambul.jpg",
      altText: 'Estambul',
    }

    ],
    [{
      src: "./assets/Sydney.jpeg",
      altText: 'Sydney',
    },
    {
      src: "./assets/Portvila.jpg",
      altText: 'Port Vila',
    },
    {
      src: "./assets/Auckland1.jpg",
      altText: 'Auckland',
    },
    {
      src: "./assets/Borabora.jpg",
      altText: 'Bora Bora',
    }
    ]
  ]

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item, index) => { // constante donde se encuentra el código que mapea  cada array y renderiza
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >

        <div className="contenedor">
          <Slide item={item} />
        </div>
      </CarouselItem >
    );
  });


  return ( // acá llamamos al componente carousel 
    <>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={[{ src: "unique string" }]} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />

      </Carousel>

    </>
  );
}




export default Carousell;


