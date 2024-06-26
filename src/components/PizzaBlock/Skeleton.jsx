import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="135" cy="135" r="125" />
    <rect x="0" y="280" rx="10" ry="10" width="280" height="25" />
    <rect x="0" y="330" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="440" rx="10" ry="10" width="95" height="30" />
    <rect x="125" y="430" rx="25" ry="25" width="150" height="45" />
  </ContentLoader>
);

export default Skeleton;
