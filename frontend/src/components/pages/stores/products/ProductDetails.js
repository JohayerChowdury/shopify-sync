import { React, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStoreActions, useUserActions } from '../../../../actions';
import { Container, Card, Row, Col, Nav } from 'react-bootstrap';

function ProductDetails() {
  const userActions = useUserActions();
  const storeActions = useStoreActions();
  //creating product array to reference product
  const [product, setProduct] = useState([]);
  //allows us to find storeId in parameters
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
    <Container className="mt-5 shadow p-3 mb-3 bg-white rounded col-xs-6 col-lg-4">
      <h1 className="mb-4 text-center">{product.title}</h1>
      {product.product_type && (
        <Card className="flex-fill">
          <Card.Title>Product Type</Card.Title>
          <Card.Subtitle className="mt-1">{product.product_type}</Card.Subtitle>
        </Card>
      )}
      {product.created_at && (
        <Card className="flex-fill">
          <Card.Title className="mt-1">
            Created At: {new Date(product.created_at).toLocaleDateString()}
          </Card.Title>
        </Card>
      )}
      {product.status && (
        <Card className="flex-fill">
          <Card.Title className="mt-1">Status: {product.status} </Card.Title>
        </Card>
      )}
      {product.image && (
        <img className="mt-1 img-thumbnail" src={product.image.src} />
      )}
      {product.images && (
        <picture>
          {product.images.forEach((image) => {
            <img className="mt-1 img-thumbnail" src={image.src}></img>;
          })}
        </picture>
      )}
      <Col>
        <Nav className="justify-content-start">
          <Nav.Link href={'/stores/' + storeId + '/products'}>
            Back to Stores's Products
          </Nav.Link>
        </Nav>
      </Col>
    </Container>
  );
}

export default ProductDetails;
