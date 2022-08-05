import React from 'react';

function Welcome() {
  return (
    <div className="welcome-banner">
      <div className="welcome-title">
        <h1>Welcome to ShyftLabs' Shopify Sync Product</h1>
        <p>
          This is an application that allows users with Shopify stores to easily
          sync their products in MongoDB.
        </p>
      </div>
      <b>Use the navigation bar to login/register.</b>
    </div>
  );
}

export default Welcome;
