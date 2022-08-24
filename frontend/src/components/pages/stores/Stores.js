import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useStoreActions, useUserActions } from '../../../actions';

function Stores(props) {
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
      <Container className="col-xs-6 col-lg-4">
        <Row className="card mt-4">
          <Col className="card-body">
            <h4 className="card-title">Name: {store.name}</h4>
            <h5 className="card-text mb-2">URL: {store.url}</h5>
          </Col>
          <Col className="card-body">
            <a href={'/stores/' + store._id} className="btn btn-success">
              See More
            </a>
          </Col>
        </Row>
      </Container>
    );
  });
  return (
    <Container>
      <h1 className="mb-4">Shopify Stores</h1>
      <a href={'/add-store/'} className="btn btn-info">
        Add a Store
      </a>
      {storesData}
    </Container>
  );
}

export default Stores;
