import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Container,
  Row,
  Col,
  Form,
  Button as RBButton,
  Nav,
} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useStoreActions } from '../../../actions';
import { DiscardChanges } from '../../../atoms';

const Button = styled(RBButton)`
  display: flex;
  width: 250px;
  justify-content: center;
  margin: 10px;
`;

function StoreDetails({ ...props }) {
  const storeActions = useStoreActions();
  const { storeId } = useParams();
  let navigate = useNavigate();

  const initialStoreState = {
    name: '',
    url: '',
    access_token: '',
    address: '',
  };

  const [discardOpen, setDiscardOpen] = useState(false);

  const [store, setStore] = useState(initialStoreState);
  const [storeFormErrors, setStoreFormErrors] = useState([]);
  // const [numProducts, setNumProducts] = useState();

  async function getStore(storeId) {
    try {
      const res = await storeActions.getOne(storeId);
      setStore(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  // const retrieveNumProducts = async () => {
  //   try {
  //     storeActions
  //       .getProductsCount()
  //       .then((res) => {
  //         setNumProducts(res.data);
  //         console.log('numProducts in profile: ' + res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    if (storeId) {
      getStore(storeId);
      // retrieveNumProducts(storeId);
    }
  }, [storeId]);

  //https://dev.to/alecgrey/controlled-forms-with-front-and-backend-validations-using-react-bootstrap-5a2
  const handleInputChange = (field, value) => {
    setStore({
      ...store,
      [field]: value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!storeFormErrors[field])
      setStoreFormErrors({
        ...storeFormErrors,
        [field]: null,
      });
  };

  const findStoreFormErrors = () => {
    const { name, url, access_token } = store;
    const newErrors = {};
    // name errors
    if (!name || name === '') newErrors.name = 'cannot be blank!';
    else if (name.length > 30) newErrors.name = 'name is too long!';
    // url errors
    if (!url || url === '') newErrors.url = 'cannot be blank!';
    // access_token errors
    if (!access_token || access_token === '')
      newErrors.access_token = 'cannot be blank!';

    return newErrors;
  };

  //when updating, run this function
  async function updateStore(e) {
    //prevents reloads after clicking submit
    e.preventDefault();
    // get our new errors
    const newErrors = findStoreFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setStoreFormErrors(newErrors);
    } else {
      try {
        const res = await storeActions.update(storeId, store);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  }

  function deleteStore() {
    storeActions
      .remove(storeId)
      .then((res) => {
        console.log(res.data);
        navigate('/stores');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleDiscard = () => {
    deleteStore();
    toast.success('Store was deleted!');
  };

  return (
    <Container className='mt-5 shadow p-3 mb-3 bg-white rounded col-xs-6 col-lg-4'>
      <DiscardChanges
        openDialog={discardOpen}
        setOpenDialog={setDiscardOpen}
        handleDiscard={handleDiscard}
        discardTitle='Are you sure you want to delete your store?'
        discardContent={`By clicking 'Discard All Changes', your store will be deleted. `}
        {...props}
      />
      <Form>
        {/* Form Group for Store Name, apply comments throughout other form groups */}
        <Row className='mb-3 text-center'>
          <h2>{store.name}</h2>
        </Row>
        <Form.Group className='mb-3'>
          <Form.Label>Store Name</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Store Name'
            value={store.name}
            name='name'
            id='name'
            onChange={(e) => handleInputChange('name', e.target.value)}
            //isInvalid property of Form that checks to alert user if there are any errors present
            isInvalid={!!storeFormErrors.name}
          />
          <Form.Control.Feedback type='invalid'>
            {storeFormErrors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Store URL</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='what comes before .myshopify.com'
            value={store.url}
            name='url'
            id='url'
            onChange={(e) => handleInputChange('url', e.target.value)}
            isInvalid={!!storeFormErrors.url}
          />
          <Form.Control.Feedback type='invalid'>
            {storeFormErrors.url}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Store Access Token</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Store access token'
            value={store.access_token}
            name='access_token'
            id='access_token'
            onChange={(e) => handleInputChange('access_token', e.target.value)}
            isInvalid={!!storeFormErrors.access_token}
          />
          <Form.Control.Feedback type='invalid'>
            {storeFormErrors.access_token}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Address'
            value={store.address}
            name='address'
            id='address'
            onChange={(e) => handleInputChange('address', e.target.value)}
            isInvalid={!!storeFormErrors.address}
          />
          <Form.Control.Feedback type='invalid'>
            {storeFormErrors.address}
          </Form.Control.Feedback>
        </Form.Group>
        {/* <Row>
          <h5 className="card-text mb-2">
            {numProducts} total products synced
          </h5>
        </Row> */}
        <Row className='justify-content-center'>
          {/*     <Col className='col-3'> */}
          <Button variant='primary' type='button' onClick={updateStore}>
            Save Changes
          </Button>
          {/* </Col> */}
          {/* <Col className='col-3'> */}
          <Button
            variant='secondary'
            type='button'
            href={'/stores/' + storeId + '/products'}
          >
            View Store's Products
          </Button>
          {/* </Col> */}
          {/* <Col className='col-3'> */}
          <Button
            variant='danger'
            type='button'
            onClick={() => setDiscardOpen(true)}
          >
            Delete
          </Button>
          {/* </Col>*/}
        </Row>
        <Row className='mt-3 justify-content-start'>
          <Col>
            <Nav className='justify-content-start'>
              <Nav.Link href='/stores'>Back to Stores</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
export default StoreDetails;
