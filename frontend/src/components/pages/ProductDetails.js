import { React, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import StoreService from '../../services/StoreService';

function ProductDetails() {
  //creating product array to reference product
  const [product, setProduct] = useState([]);
  //allows us to find storeId in parameters
  const { storeId, productId } = useParams();

  function getProduct(storeId, productId) {
    StoreService.getSpecificProduct(storeId, productId)
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
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
    <div className="container">
      <a href={'/stores/' + storeId + '/products'} className="btn btn-warning">
        Back to Store's Products
      </a>
      <h1 className="mb-4">Product Name: {product.title}</h1>
      <h2>Type: {product.product_type}</h2>
      <h2>Created At: {new Date(product.created_at).toLocaleDateString()}</h2>
      <h2>Status: {product.status}</h2>
    </div>
  );
}

export default ProductDetails;
