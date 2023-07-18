//Purpose: Render a reusable Form component that has form validations.
//inspired by:
//  https://www.bezkoder.com/react-node-express-mongodb-mern-stack/#Project_Structure-2
//  https://dev.to/alecgrey/controlled-forms-with-front-and-backend-validations-using-react-bootstrap-5a2

import { React, useState } from 'react';
import styled from 'styled-components';
import {
  Container as RBContainer,
  Row as RBRow,
  Col,
  Form,
  FormGroup as RBFG,
  Button,
  Nav,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useUserActions, useStoreActions } from '../actions';
// import ErrorMsg from './UI/ErrorMsg';

const Container = styled(RBContainer)`
  margin-top: 25px;
  margin-bottom: 3px;
  padding: 3px;
  background: white;
  box-shadow: 0px 2px 10px gray;
  width: 50%;
  @media (min-width: 992px) {
    width: 33.33%;
  }
`;

const Row = styled(RBRow)`
  margin-bottom: 3px;
  justify-content: center;
  text-align: center;
`;

const FormGroup = styled(RBFG)`
  margin-bottom: 3px;
`;

function StoreForm() {
  const navigate = useNavigate();

  const userActions = useUserActions();
  const currentUser = userActions.profile();

  const storeActions = useStoreActions();

  //allows us to redirect to different pages
  const initialStoreState = {
    name: '',
    url: '',
    access_token: '',
    address: '',
  };

  const [storeForm, setStoreForm] = useState(initialStoreState);
  const [storeFormErrors, setStoreFormErrors] = useState([]);

  //https://dev.to/alecgrey/controlled-forms-with-front-and-backend-validations-using-react-bootstrap-5a2
  const handleInputChange = (field, value) => {
    setStoreForm({
      ...storeForm,
      [field]: value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!storeFormErrors[field])
      setStoreFormErrors({
        ...storeFormErrors,
        [field]: null,
      });
  };

  const clearForm = () => {
    setStoreForm(initialStoreState);
  };

  const findStoreFormErrors = () => {
    const { name, url, access_token } = storeForm;
    const newErrors = {};
    if (!name || name === '') newErrors.name = 'cannot be blank!';
    else if (name.length > 30) newErrors.name = 'name is too long!';
    if (!url || url === '') newErrors.url = 'cannot be blank!';
    if (!access_token || access_token === '')
      newErrors.access_token = 'cannot be blank!';

    return newErrors;
  };

  function handleSubmit(e) {
    e.preventDefault();
    // get our new errors
    const newErrors = findStoreFormErrors();
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setStoreFormErrors(newErrors);
    } else {
      let store = {
        name: storeForm.name,
        url: storeForm.url,
        access_token: storeForm.access_token,
        address: storeForm.address,
        owner: currentUser.data.user._id,
      };
      storeActions
        .add(store)
        .then((res) => {
          setStoreForm({
            name: res.name,
            url: res.url,
            access_token: res.access_token,
            address: res.address,
          });
          navigate('/stores');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <Container className='rounded'>
      <Form onReset={clearForm}>
        <Row>
          <h2>Provide Shopify Store Details</h2>
        </Row>
        <FormGroup>
          <Form.Label>Store Name</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Store Name'
            value={storeForm.name}
            name='name'
            id='name'
            onChange={(e) => handleInputChange('name', e.target.value)}
            //isInvalid property of Form that checks to alert user if there are any errors present
            isInvalid={!!storeFormErrors.name}
          />
          <Form.Control.Feedback type='invalid'>
            {storeFormErrors.name}
          </Form.Control.Feedback>
        </FormGroup>
        <FormGroup>
          <Form.Label>Store URL</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='what comes before .myshopify.com'
            value={storeForm.url}
            name='url'
            id='url'
            onChange={(e) => handleInputChange('url', e.target.value)}
            isInvalid={!!storeFormErrors.url}
          />
          <Form.Control.Feedback type='invalid'>
            {storeFormErrors.url}
          </Form.Control.Feedback>
        </FormGroup>
        <FormGroup>
          <Form.Label>Store Access Token</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Store access token'
            value={storeForm.access_token}
            name='access_token'
            id='access_token'
            onChange={(e) => handleInputChange('access_token', e.target.value)}
            isInvalid={!!storeFormErrors.access_token}
          />
          <Form.Control.Feedback type='invalid'>
            {storeFormErrors.access_token}
          </Form.Control.Feedback>
        </FormGroup>
        <FormGroup>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Address'
            value={storeForm.address}
            name='address'
            id='address'
            onChange={(e) => handleInputChange('address', e.target.value)}
            isInvalid={!!storeFormErrors.address}
          />
          <Form.Control.Feedback type='invalid'>
            {storeFormErrors.address}
          </Form.Control.Feedback>
        </FormGroup>
        <RBRow className='mb-3'>
          <Col>
            <Nav className='justify-content-start'>
              <Nav.Link href='/stores'>Back to All Stores</Nav.Link>
            </Nav>
          </Col>
          <Col>
            <Button
              className='justify-content-end'
              variant='primary'
              type='submit'
              onClick={handleSubmit}
            >
              Add Shopify Store
            </Button>
          </Col>
        </RBRow>
      </Form>
    </Container>
  );
}

export default StoreForm;
