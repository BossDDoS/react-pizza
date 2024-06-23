import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const FullPizza: React.FC = () => {
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
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
