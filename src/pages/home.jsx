import { HTML5Backend } from 'react-dnd-html5-backend';
import Bur from '../components/burger-ingredients/Burger-Ingredients.jsx';
import Constructor from '../components/burger-constructor/Burger-Constructor.jsx';
import { DndProvider } from 'react-dnd';
import React from 'react';

export const Home = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Bur />
      <Constructor />
    </DndProvider>
  );
};
