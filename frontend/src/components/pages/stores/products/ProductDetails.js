import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Container, Card, Row, Col, Nav } from 'react-bootstrap';

import { useStoreActions, useUserActions } from '../../../../actions';

const Image = styled.img`
  width: 400px;
  height: 400px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

function ProductDetails() {
  const userActions = useUserActions();
  const storeActions = useStoreActions();
  const [product, setProduct] = useState([]);
  const { storeId, productId } = useParams();

  function getProduct(storeId, productId) {
    storeActions
      .getOneProduct(storeId, productId)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (productId) {
      getProduct(storeId, productId);
    }
  }, [productId]);

  return (
    <Container className='mt-5 shadow p-3 mb-3 bg-white rounded col-xs-6 col-lg-4'>
      <h1 className='mb-4 text-center'>{product.title}</h1>
      {product.product_type && (
        <Card className='flex-fill'>
          <Card.Title>Product Type</Card.Title>
          <Card.Subtitle className='mt-1'>{product.product_type}</Card.Subtitle>
        </Card>
      )}
      {product.created_at && (
        <Card className='flex-fill'>
          <Card.Title className='mt-1'>
            Created At: {new Date(product.created_at).toLocaleDateString()}
          </Card.Title>
        </Card>
      )}
      {product.status && (
        <Card className='flex-fill'>
          <Card.Title className='mt-1'>Status: {product.status} </Card.Title>
        </Card>
      )}
      {product.image && (
        <Image className='mt-1 img-thumbnail' src={product.image.src} />
      )}
      {product.images && (
        <picture>
          {product.images.forEach((image) => {
            <Image className='mt-1 img-thumbnail' src={image.src} />;
          })}
        </picture>
      )}
      <Col>
        <Nav className='justify-content-start'>
          <Nav.Link href={'/stores/' + storeId + '/products'}>
            Back to Stores's Products
          </Nav.Link>
        </Nav>
      </Col>
    </Container>
  );
}

export default ProductDetails;
