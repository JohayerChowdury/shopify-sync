import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useStoreActions, useUserActions } from '../../../actions';

function Stores() {
  const userActions = useUserActions();
  const currentUser = userActions.profile();

  const storeActions = useStoreActions();
  const [stores, setStores] = useState([]);

  useEffect(() => {
    retrieveStores();
  }, []);

  const retrieveStores = async () => {
    try {
      storeActions
        .getAll()
        .then((res) => {
          setStores(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const storesData = stores.map((store) => {
    return (
      <div className="card mt-4">
        <div className="card-body">
          <h4 className="card-title">Name: {store.name}</h4>
          <div className="card-text mb-2">URL: {store.url}</div>
          <a href={'/stores/' + store._id} className="btn btn-success">
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
