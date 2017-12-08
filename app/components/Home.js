import React from 'react';
import Draggable from 'react-draggable';

const Home = () => {
  return (
    <div id='homepage'>
      <div id="planet_parent">
        <Draggable>
          <div id="earth"></div>
        </Draggable>
        <Draggable>
          <div id='ice'></div>
        </Draggable>
        <Draggable>
          <div id='smoke'></div>
        </Draggable>
      </div>
      <h1 id='welcometext'>Welcome</h1>
    </div>
  )
};

export default Home
