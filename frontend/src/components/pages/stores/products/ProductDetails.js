import { React, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStoreActions, useUserActions } from '../../../../actions';
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Image,
} from 'react-bootstrap';

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
          <Card.Title>
            Created At: {new Date(product.created_at).toLocaleDateString()}
          </Card.Title>
        </Card>
      )}
      {product.status && (
        <Card className="flex-fill">
          <Card.Title>Status: {product.status} </Card.Title>
        </Card>
      )}
      {product.img && <img>{product.img}</img>}

      <Button
        href={'/stores/' + storeId + '/products'}
        className="btn btn-warning mt-5 justify-content-center text-center"
      >
        Back to Store's Products
      </Button>
    </Container>
  );
}

export default ProductDetails;
