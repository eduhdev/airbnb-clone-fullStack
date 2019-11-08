import React, { useState } from 'react';

export default function New() {
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = () => {

  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="company">COMPANY *</label>
      <input 
        type="text" 
        placeholder="Your Company"
        value={company}
        onChange={e => setCompany(e.target.value)}
      />

    <label htmlFor="company">TECHS * <span>( comma separated )</span></label>
      <input 
        type="text" 
        placeholder="What techs it use?"
        value={techs}
        onChange={e => setTechs(e.target.value)}
      />

    <label htmlFor="company">DAILY VALUE * <span>(empty for FREE)</span></label>
      <input 
        type="number" 
        placeholder="Daily Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      <button className="btn" type="submit">Create</button>
    </form>
  );
}
