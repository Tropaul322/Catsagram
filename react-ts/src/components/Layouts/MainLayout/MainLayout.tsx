import React from 'react';
import './styles.css';

function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="home_wrapper">
      <div className="header">
        <h1>Catsagram</h1>
      </div>
      <div className="container">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
