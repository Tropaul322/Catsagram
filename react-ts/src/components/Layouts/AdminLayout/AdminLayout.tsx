import React from 'react';
import './styles.css';

function AdminLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="home_wrapper">
      <div className="header">
        <h1>Admin</h1>
        <span className="header_description">
          If you like one of the cat you can click "Like" button
        </span>
      </div>
      {children}
    </div>
  );
}

export default AdminLayout;
