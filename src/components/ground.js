import React from 'react';
import { useEffect, useState } from 'react';

const Ground = ({ ground, sideSize, toggleClick }) => {
  // const [color, setColor] = useState('ligthgray')
  // style={{ backgroundColor: color }}
  // useEffect(() => { if (ground > 10) { setColor('green') } })

  return (

    <div className='container' style={{
      width: `${sideSize * 11}px`, height: `${sideSize * 11}px`
    }} >

      {
        ground.map((x, i) => <div
          className={`cell ${x.clicked === 1 ? "inhabited" : ""}`}
          onClick={() => toggleClick(i)}> {x.neighbours}
        </div>)
      }


    </div >

  );
};
export default Ground