'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchHeroData, fetchImageLayoutData } from '@/app/api/fetchData';

export function LayoutGridDemo() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchImageLayoutData();
        setCards(data);
      } catch (error) {
        console.error('Error fetching data.', error);
      }
    };

    fetchData();
  }, []);
}

const LayoutGrid = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cards.map((card) => (
        <div key={card.id} className={`card ${card.attributes.className}`}>
          <img
            src={card.attributes.thumbnail.data.attributes.url}
            alt={card.attributes.title}
            className="object-cover w-full h-full"
          />
          <div className="content">
            <h2 className="text-2xl font-bold text-white">{card.attributes.title}</h2>
            <p className="text-white">{card.attributes.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
