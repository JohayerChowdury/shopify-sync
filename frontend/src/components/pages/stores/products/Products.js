import { React, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStoreActions, useUserActions } from '../../../../actions';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

function Products() {
  const userActions = useUserActions();
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

  const productsData = products.map((product) => {
    return (
      <div className="card mt-4">
        <div className="card-body">
          <h4 className="card-title">{product.title}</h4>
          <div className="card-text mb-2">Shopify ID: {product.product_id}</div>
          <div className="card-subtitle text-muted mb-2">
            {new Date(product.created_at).toLocaleDateString()}
          </div>
          <a
            href={'/stores/' + storeId + '/products/' + product.product_id}
            className="btn btn-primary"
          >
            See More
          </a>
        </div>
      </div>
    );
  });
  return (
    <Container className="col-xs-8 col-lg-6">
      <h1 className="mt-4 mb-4">Products</h1>
      <Row className="row-cols-2">
        <Col>
          <Button className="btn btn-success" href={'/stores/' + storeId}>
            Back to Store
          </Button>
        </Col>
        <Col>
          <Button
            type="submit"
            className="btn btn-warning"
            onClick={() => setSync(true)}
            // onClick={() => syncProducts}
          >
            Sync Store Products from Shopify
          </Button>
        </Col>
      </Row>
      {productsData}
    </Container>
  );
}

export default Products;
