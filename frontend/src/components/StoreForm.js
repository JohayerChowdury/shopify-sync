//Purpose: Render a reusable Form component that has form validations.
//inspired by:
//  https://www.bezkoder.com/react-node-express-mongodb-mern-stack/#Project_Structure-2
//  https://dev.to/alecgrey/controlled-forms-with-front-and-backend-validations-using-react-bootstrap-5a2

import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { useUserActions, useStoreActions } from '../actions';

function StoreForm() {
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
  //   const dispatch = useDispatch();

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
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className="container">
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
            value={storeForm.name}
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
            value={storeForm.url}
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
            value={storeForm.access_token}
            name="access_token"
            id="access_token"
            onChange={(e) => handleInputChange('access_token', e.target.value)}
            isInvalid={!!storeFormErrors.access_token}
          />
          <Form.Control.Feedback type="invalid">
            {storeFormErrors.access_token}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address"
            value={storeForm.address}
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
          <a href="/stores" className="btn btn-danger">
            Back to Stores{' '}
          </a>
        </div>
      </Form>
    </div>
  );
}

export default StoreForm;
