import React from 'react';
// import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className = "welcome-banner">
    <div className = "welcome-title">
      <h1>
        Welcome to ShyftLabs' Shopify Sync Product
      </h1>
    </div>
    &nbsp;
    &nbsp;
    <div className = "homepage-subheader">
      <h2>
        How This Product Works
      </h2>
    </div>
    <div className = "row">
      <div className = "instruction-widget">
      <div className = "instruction-header">    
        Connect To Your Database
      </div>
      </div>
      &nbsp;
      <div className = "instruction-widget">
        <div className = "instruction-header">
          Add Your Shopify Stores
        </div>
      </div>
      &nbsp;
      <div className = "instruction-widget">
        <div className = "instruction-header">
          Sync Your Products
        </div>
      </div>
    </div>
 
    </div>



  );
}

export default Home;
