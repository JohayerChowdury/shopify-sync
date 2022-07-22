import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Stores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    axios
      .get('/shopify_api/stores')
      .then((res) => {
        console.log(res);
        setStores(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const storesData = stores.map((store) => {
    return (
      <div className="card mt-4">
        <div className="card-body">
          <h4 className="card-title">Name: {store.name}</h4>
          <div className="card-text mb-2">URL: {store.url}</div>
          <Link to="/stores/{store.storeId}"></Link>
        </div>
      </div>
    );
  });
  return (
    <div className="container">
      <h1 class="mb-4">Shopify Stores</h1>
      {storesData}
    </div>
  );
}

export default Stores;
