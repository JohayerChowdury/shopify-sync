import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useStoreActions, useUserActions } from '../../../actions';

function Stores(props) {
  const userActions = useUserActions();
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
      // <Row className="gy-3 mt-4 shadow p-3 mb-3 rounded">
      //   <Col className="col-auto">
      //     <h4 className="card-title">Name: {store.name}</h4>
      //     <h5 className="card-text mb-2">URL: {store.url}</h5>
      //   </Col>
      //   <Col className="col-auto">
      //     <a href={'/stores/' + store._id}>See More</a>
      //   </Col>
      // </Row>
      <Row className="gy-3 mt-4 shadow p-3 mb-3 rounded col-lg-4 col-xs-4">
        <Col className="justify-content-center col-6">
          <h4 className="card-title">Name: {store.name}</h4>
          <h5 className="card-text mb-2">URL: {store.url}</h5>
        </Col>
        <Col className="p-3 align-items-center col-6">
          <a href={'/stores/' + store._id}>See More</a>
        </Col>
      </Row>
    );
  });
  return (
    <Container>
      <h1 className="mt-4 mb-4">Shopify Stores</h1>
      <a href={'/add-store/'} className="btn btn-primary">
        Add a Store
      </a>
      {storesData}
    </Container>
  );
}

export default Stores;
