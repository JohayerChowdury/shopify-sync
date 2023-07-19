import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button as RBButton, Nav } from 'react-bootstrap';
import {
  Card as MuiCard,
  CardContent,
  CardActions,
  Box as MuiBox,
} from '@mui/material';

import { useStoreActions } from '../../../../actions';

const Card = styled(MuiCard)`
  margin-top: 4px;
  max-width: 345px;
`;

const Box = styled(MuiBox)`
  display: inline-block;
  max-height: 400px;
  width: 300px;
  max-inline-size: 400px;
  margin: 10px;
`;

const Button = styled(RBButton)`
  align-self: center;
`;

function Products() {
  const storeActions = useStoreActions();

  //allows us to find storeId in parameters
  const { storeId } = useParams();
  const [products, setProducts] = useState([]);
  const [sync, setSync] = useState(false);

  function retrieveStoreProducts(storeId) {
    storeActions
      .getProducts(storeId)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function syncProducts(storeId) {
    storeActions
      .sync(storeId)
      .then((res) => {
        console.log(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (storeId) {
      retrieveStoreProducts(storeId);
    }
  }, [storeId]);

  useEffect(() => {
    if (sync) {
      syncProducts(storeId);
      setSync(false);
      retrieveStoreProducts(storeId);
    }
  }, [!sync]);

  const syncing = () => {
    setSync(true);
    window.location.reload(false);
  };

  const productsData = products.map((product) => {
    return (
      <Box>
        <Card>
          <CardContent>
            <h4 className='card-title'>{product.title}</h4>
            <div className='card-text mb-2'>
              Shopify ID: {product.product_id}
            </div>
            <div className='card-subtitle text-muted mb-2'>
              {new Date(product.created_at).toLocaleDateString()}
            </div>
          </CardContent>
          <CardActions>
            <Button
              href={'/stores/' + storeId + '/products/' + product.product_id}
            >
              See More
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
  });

  return (
    <Container>
      <Row className='mt-4 mb-4'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='col-md-2 col-sm-4'>
          <Nav>
            <Nav.Link href={'/stores/' + storeId}>Back to Store</Nav.Link>
          </Nav>
        </Col>
      </Row>
      <Row>
        <Col className='col-md-4 col-sm-6'>
          <Button type='submit' className='btn btn-success' onClick={syncing}>
            Sync Store Products from Shopify
          </Button>
        </Col>
      </Row>
      {productsData}
    </Container>
  );
}

export default Products;
