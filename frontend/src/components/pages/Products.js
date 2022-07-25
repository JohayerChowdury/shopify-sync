import { React, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StoreService from '../../services/StoreService';

function Products() {
  //allows us to find storeId in parameters
  const { storeId } = useParams();
  const [products, setProducts] = useState([]);
  const [sync, setSync] = useState(false);

  function retrieveStoreProducts(storeId) {
    StoreService.getProducts(storeId)
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function syncProducts(storeId) {
    StoreService.sync(storeId)
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
    <div className="container">
      <h1 className="mb-4">Products</h1>
      <a href={'/stores/' + storeId} className="btn btn-success">
        Back to Store
      </a>
      <button
        type="submit"
        className="btn btn-warning"
        onClick={() => setSync(true)}
      >
        Sync Store Products from Shopify
      </button>
      {productsData}
    </div>
  );
}

export default Products;
