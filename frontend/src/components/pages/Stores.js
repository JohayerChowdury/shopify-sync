import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import StoreService from '../../services/StoreService';
// import { retrieveStores } from '../../actions/store_actions';

function Stores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    retrieveStores();
  }, []);

  const retrieveStores = () => {
    StoreService.getAll()
      .then((res) => {
        setStores(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const storesData = stores.map((store) => {
    return (
      <div className="card mt-4">
        <div className="card-body">
          <h4 className="card-title">Name: {store.name}</h4>
          <div className="card-text mb-2">URL: {store.url}</div>
          <a href={'/stores/' + store.storeId} className="btn btn-success">
            See More
          </a>
        </div>
      </div>
    );
  });
  return (
    <div className="container">
      <h1 className="mb-4">Shopify Stores</h1>
      <a href={'/add-store/'} className="btn btn-info">
        Add a Store
      </a>{' '}
      {storesData}
    </div>
  );
}

export default Stores;
