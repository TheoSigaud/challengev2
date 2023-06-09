import React, { useState } from 'react';
import Card from './Card';
import Row from './Row';
import Link from "next/link";

const Scroll = () => {
    
  const [playing, setPlaying] = useState(true);

  const cardDetails = [
    {
      id: 0,
      avatar: './splendor.webp',
    },
    {
      id: 1,
      avatar:
        './when.png',
    },
    {
      id: 2,
      avatar:
      './skull.webp',

    },
    {
      id: 3,
      avatar:
      './splendor.webp',
    },
    {
      id: 4,
      avatar:
      './when.png',
    },
    {
      id: 5,
      avatar:
      './wonders.png',
    },
  ];
  

  return (
    <div className="flex flex-col justify-center items-center overflow-hidden py-10 bg-white">
      <Row speed={75} playing={playing}>
        {cardDetails.map((card, idx) => (
          <Card key={idx} card={card} />
        ))}
      </Row>

      <Link href="/announcement"
          className="mt-16 text-white bg-custom-orange hover:bg-custom-hover-orange focus:ring-4 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 text-center">Découvrez nos jeux de société !
      </Link>
    </div>
  );
};

export default Scroll;
