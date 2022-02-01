import React from 'react';

function Cardjob(props) {
  return (
    <a href="https://forms.gle/vub1yq4ToWumgown8" target='_black'>
    <div className="card1">
    <img className="medium" src={props.url} alt={props.name} className='image1' />
    <div className="card-body">
        <h1 className='heading-card'>{props.name}</h1>
    </div>
    </div>
    </a>
  );
}

export default Cardjob;
