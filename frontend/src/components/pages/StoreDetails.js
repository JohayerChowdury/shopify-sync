import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function StoreDetails(props) {
  const [store, setStore] = useState([]);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`/shopify_api/stores/${params.storeId}`)
      .then((res) => {
        console.log(res);
        setStore(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="mb-4">Name: {store.name}</h1>
      <h4>Address: {store.address} </h4>
      <h4>URL: {store.url}</h4>
      <h4>Access token: {store.access_token}</h4>
    </div>
  );
}
export default StoreDetails;
