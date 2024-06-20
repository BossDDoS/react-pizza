import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function FullPizza() {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://66641d59932baf9032aa0642.mockapi.io/items/' + id);

        setPizza(data);
      } catch (error) {
        alert('Пицца не нашлась');
        navigate('/');
      }
    }
    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return <div>Загрузка пиццы</div>;
  }

  return (
    <div className="container">
      <img className="pizza-block__image" src={pizza.imageUrl} alt="Пицца" />
      <h2>{pizza.title}</h2>

      <h4>{pizza.price} ₽</h4>
    </div>
  );
}

export default FullPizza;