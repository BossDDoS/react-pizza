import React from 'react';
import logoSvg from '../assets/img/pizza-logo.svg';

const LogoBlock: React.FC = () => {
  return (
    <div className="header__logo">
      <img width="38" src={logoSvg} alt="Pizza logo" />
      <div>
        <h1>React Pizza</h1>
        <p>самая вкусная пицца во вселенной</p>
      </div>
    </div>
  );
};

export default LogoBlock;
