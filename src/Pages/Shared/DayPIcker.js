import { format } from 'date-fns';
import React from 'react';
import { useState } from 'react';


import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const DayPIcker = () => {
    const [date, setDate] = useState();
    const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid currentColor;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: blue;
    color: blue;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: red;
  }
`;

let footer = <p>Please pick a day.</p>;
if (date) {
  footer = <p>You picked {format(date, 'PP')}.</p>;
}
    return (
        <div>
             <>
      <style>{css}</style>
      <DayPicker
      mode="single"
      selected={date}
      onSelect={setDate}
      footer={footer}
    />
    </>
        </div>
    );
};

export default DayPIcker;