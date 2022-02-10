import React, { useState } from 'react';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="search" onSubmit={submitHandler}>
    
        <input
          type="text"
          name="search"
          id="searchbox"
          onChange={(e) => setName(e.target.value)}
          placeholder="Search"
        />
        <a className="searchIcon" type="submit">
        
        </a>

    </form>
  );
}
