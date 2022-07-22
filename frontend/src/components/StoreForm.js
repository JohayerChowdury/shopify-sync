import { React, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import StoreService from '../services/StoreService';
import { useDispatch } from 'react-redux';
import { addStore } from '../actions/store_actions';

function StoreForm(onSave, onCancel, store) {
  const storeId = store && store.storeId ? store.storeId : undefined;

  const initialStoreState = {
    name: storeId ? store.name : '',
    url: storeId ? store.url : '',
    access_token: storeId ? store.access_token : '',
    storeId: storeId ? store.storeId : '',
    address: storeId ? store.address : '',
  };

  const [storeForm, setStoreForm] = useState(initialStoreState);
  const [storeFormErrors, setStoreFormErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

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
    setSubmitted(false);
  };

  const findStoreFormErrors = () => {
    const { name, url, access_token, storeId, address } = storeForm;
    const newErrors = {};
    // name errors
    if (!name || name === '') newErrors.name = 'cannot be blank!';
    else if (name.length > 30) newErrors.name = 'name is too long!';
    // url errors
    if (!url || url === '') newErrors.url = 'cannot be blank!';
    // access_token errors
    if (!access_token || access_token === '')
      newErrors.access_token = 'cannot be blank!';
    // storeId errors
    if (!storeId || storeId === '') newErrors.storeId = 'cannot be blank!';
    else if (storeId.length > 30) newErrors.storeId = 'storeId is too long!';

    return newErrors;
  };

  //when submitting, run this function
  function handleSubmit(e) {
    //prevents reloads after clicking submit
    e.preventDefault();
    // get our new errors
    const newErrors = findStoreFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setStoreFormErrors(newErrors);
    } else {
      const { name, url, access_token, storeId, address } = storeForm;
      dispatch(addStore(name, url, access_token, storeId, address))
        .then((store) => {
          setStoreForm({
            name: store.name,
            url: store.url,
            access_token: store.access_token,
            storeId: store.storeId,
            address: store.address,
          });
          setSubmitted(true);
          console.log(store);
        })
        .catch((err) => {
          console.log(err);
        });
      alert('Added store');
    }
  }

  return (
    <div className="container">
      {submitted ? (
        <div>
          <h4>You submitted a store successfully!</h4>
          <div className="buttons">
            <Button variant="primary" type="submit" onClick={clearForm}>
              Add Shopify Store
            </Button>
          </div>
        </div>
      ) : (
        <Form onReset={clearForm}>
          {/* Form Group for Store Name, apply comments throughout other form groups */}
          <Form.Group className="mb-3">
            {/* Label in user interface */}
            <Form.Label>Store Name</Form.Label>
            {/* Attributes of form */}
            <Form.Control
              required
              type="text"
              placeholder="Store Name"
              name="name"
              id="name"
              // when form is being written in, the handleInputChange function is called for the specific
              onChange={(e) => handleInputChange('name', e.target.value)}
              //isInvalid property of Form that checks to alert user if there are any errors present
              isInvalid={!!storeFormErrors.name}
            />
            {/* alert user of specific form errors */}
            <Form.Control.Feedback type="invalid">
              {storeFormErrors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Store URL</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="what comes before .myshopify.com"
              name="url"
              id="url"
              onChange={(e) => handleInputChange('url', e.target.value)}
              isInvalid={!!storeFormErrors.url}
            />
            <Form.Control.Feedback type="invalid">
              {storeFormErrors.url}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Store Access Token</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Store access token"
              name="access_token"
              id="access_token"
              onChange={(e) =>
                handleInputChange('access_token', e.target.value)
              }
              isInvalid={!!storeFormErrors.access_token}
            />
            <Form.Control.Feedback type="invalid">
              {storeFormErrors.access_token}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              {' '}
              Store ID (used to access store in this application)
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Perhaps your store name?"
              name="storeId"
              id="storeId"
              onChange={(e) => handleInputChange('storeId', e.target.value)}
              isInvalid={!!storeFormErrors.storeId}
            />
            <Form.Control.Feedback type="invalid">
              {storeFormErrors.storeId}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              name="address"
              id="address"
              onChange={(e) => handleInputChange('address', e.target.value)}
              isInvalid={!!storeFormErrors.address}
            />
            <Form.Control.Feedback type="invalid">
              {storeFormErrors.address}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="buttons">
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Add Shopify Store
            </Button>
            <Button variant="secondary" type="reset">
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
}

export default StoreForm;
