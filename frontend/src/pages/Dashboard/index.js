import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../services/api';
import './styles.css';

export default function Dashboard() {
  const [spots, setSpots] = useState(null);

  useEffect(() => {
    async function loadSpots(params) {
      const user_id = localStorage.getItem('user');
      const response = await Api.get('/dashboard', {headers: { user_id }});

      setSpots(response.data);
    }

    loadSpots();
  }, []);

  return (
    <>
      <ul className="spot-list">
        {
          spots === null ? 
            'Carregando...' :
            (
              spots.length ?
                spots.map(spot => 
                  <li key={spot._id}>
                    <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                    <strong>{spot.company}</strong>
                    <span>{spot.price ? `R$ ${spot.price}/dia` : 'GRATUITO'}</span>
                  </li>
                ) :
                <p>
                  Nenhum registro encontrado
                </p>
            )          
        }
      </ul>

      <Link to="/new">
        <button className="btn">Cadastrar novo Spot</button>
      </Link>
    </>
  );
}