import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useStoreActions } from '../../../actions';
import { Card as MuiCard } from '@mui/material';

const Card = styled(MuiCard)`
  margin-top: 10px;
`;

function Stores() {
  const storeActions = useStoreActions();

  const [stores, setStores] = useState([]);

  useEffect(() => {
    retrieveStores();
  }, []);

  const retrieveStores = async () => {
    try {
      const res = await storeActions.getAll();
      setStores(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const storesData = stores.map((store) => {
    return (
      <Card variant='outlined'>
        <Row className='p-3 rounded col-xs-4'>
          <Col className='justify-content-center col-4'>
            <h4 className='card-title'>Name: {store.name}</h4>
            <h5 className='card-text mb-2'>URL: {store.url}</h5>
          </Col>
          <Col className='align-items-center col-6'>
            <h5 className='card-text mb-2'>Address: {store.address}</h5>
          </Col>
          <Col className='align-items-center col-2'>
            <a href={'/stores/' + store._id}>View Store and Products</a>
          </Col>
        </Row>
      </Card>
    );
  });
  return (
    <Container>
      <h1 className='mt-4 mb-4'>Shopify Stores</h1>
      {storesData}
      <Button
        variant='primary'
        type='submit'
        style={{ width: '45%', marginTop: '15px', marginBottom: '5px' }}
        href={'/add-store/'}
      >
        Add a Store
      </Button>
    </Container>
  );
}

export default Stores;
