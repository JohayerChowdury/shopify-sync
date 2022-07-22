import React from 'react';
// import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <h1
        style={{
          fontSize: 45,
          fontStyle: 'italic',
          fontWeight: 'bold',
          alignSelf: 'center',
        }}
      >
        Welcome to ShyftLabs' Shopify Sync Product.
      </h1>
      <br />
      <br />
      {/* <!-- Solution Section Detail --> */}
      {/* inspired from main shyftlabs website development */}
      <div class="container">
        <h1 class="mb-4">Welcome to ShyftLabs Shopify Sync Application.</h1>
        <p>
          This is an application that allows users with Shopify stores to easily
          sync their products in MongoDB.
        </p>
        <p>
          Click the button below to view all Shopify stores for your account.
        </p>
      </div>
      <div class="container">
        <a href="/shopify_api/stores" class="btn btn-success">
          View Shopify Stores
        </a>
      </div>
    </div>
  );
}

export default Home;
