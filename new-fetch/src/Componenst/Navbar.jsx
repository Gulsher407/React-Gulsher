import React, { useState } from 'react';

export default function Navbar({ setCategory }) {
  const [activeCategory, setActiveCategory] = useState('general');

  const handleCategoryClick = (category) => {
    setCategory(category);
    setActiveCategory(category);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <span className='badge bg-light text-dark' onClick={() => handleCategoryClick('general')}>News-App</span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className={`nav-link ${activeCategory === 'technology' ? 'active' : ''}`} onClick={() => handleCategoryClick('technology')} style={{ cursor: 'pointer' }}>Technology</div>
            </li>
            <li className="nav-item">
              <div className={`nav-link ${activeCategory === 'sports' ? 'active' : ''}`} onClick={() => handleCategoryClick('sports')} style={{ cursor: 'pointer' }}>Sports</div>
            </li>
            <li className="nav-item">
              <div className={`nav-link ${activeCategory === 'science' ? 'active' : ''}`} onClick={() => handleCategoryClick('science')} style={{ cursor: 'pointer' }}>Science</div>
            </li>
            <li className="nav-item">
              <div className={`nav-link ${activeCategory === 'health' ? 'active' : ''}`} onClick={() => handleCategoryClick('health')} style={{ cursor: 'pointer' }}>Health</div>
            </li>
            <li className="nav-item">
              <div className={`nav-link ${activeCategory === 'business' ? 'active' : ''}`} onClick={() => handleCategoryClick('business')} style={{ cursor: 'pointer' }}>Business</div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
