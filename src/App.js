import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import image1 from './images/image1.png';
import image2 from './images/image2.png';
import image3 from './images/image3.png';
import image4 from './images/image4.png';
import image5 from './images/image5.png';
import image6 from './images/image6.png';
const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
];


const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }
`;



const CarouselItem = styled.div`
  flex: 0 0 33.33%; /* Ensure there are only 3 visible items */
  margin-right: 10px;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: auto;
  border: 2px solid gray;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const ControlButton = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  padding: 5px 10px;
  margin: 0 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0062cc;
  }

  &:active {
    background-color: #005cbf;
  }
`;



const MyCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {

    const intervalId = setInterval(() => {
      if (currentImageIndex === images.length - 1) {
        setCurrentImageIndex(0);
      } else {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [currentImageIndex]);

  useEffect(() => {

    carouselRef.current.scrollTo({
      left: carouselRef.current.offsetWidth * currentImageIndex,
      behavior: 'smooth',
    });
  }, [currentImageIndex]);

  return (
    <>
      <CarouselWrapper ref={carouselRef}>
        {images.map((imageUrl, index) => (
          <CarouselItem key={index}>

            <CarouselImage src={images[index]} alt={`Image ${index + 1}`} />
          </CarouselItem>
        ))}
      </CarouselWrapper>
      <ButtonWrapper>
        <ControlButton
          onClick={handlePrevClick}
          disabled={currentImageIndex === 0}
        >
          Previous
        </ControlButton>

        <ControlButton
          onClick={handleNextClick}
          disabled={currentImageIndex === images.length - 1}
        >
          Next
        </ControlButton>
      </ButtonWrapper>
    </>
  );
};

export default MyCarousel;





