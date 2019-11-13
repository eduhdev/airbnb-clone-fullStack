import React, { useState, useMemo } from 'react';

import './styles.css';

import api from '../../services/api';

import cameraIcon from '../../assets/camera.svg';

export default function New({history}) {
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('/spots', data, {
      headers: { user_id }
    });
    
    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label id="thumbnail" 
        style={{ backgroundImage: `url(${preview})`}}
        className={thumbnail ? 'has-thumbnail' : ''}
      >
        <input type="file" onChange={e => setThumbnail(e.target.files[0   ] )}/>
        <img src={cameraIcon} alt="Select img" />
      </label>

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
