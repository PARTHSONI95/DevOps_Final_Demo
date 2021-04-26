import React from 'react';
import { Bullseye } from '@patternfly/react-core';
import { Form, FormGroup, TextInput, Popover, ActionGroup, Button } from '@patternfly/react-core';
import HelpIcon from '@patternfly/react-icons/dist/js/icons/help-icon';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value1: '',
      value2: '',
      value3: '',
      FLASK_URL: process.env.REACT_APP_URL || 'http://localhost:5000'
    };
    this.handleTextInputChange1 = value1 => {
      this.setState({ value1 });
      //console.log(this.state.value1);
    };
    this.handleTextInputChange2 = value2 => {
      this.setState({ value2 });
    };
    this.handleTextInputChange3 = value3 => {
      this.setState({ value3 });
    };

    this.handleHistory = () => {
      this.props.history.goBack();
    };

    this.handleSignUp = async (event) => {
      event.preventDefault();

      // register new user!
    //.. return userid
      const paramdict = {
        'username': this.state.value1,
        'password': this.state.value3,
        'emailid': this.state.value2
      }

      try {
        const config = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paramdict)
        }
        const response = await fetch(this.state.FLASK_URL+'/insertUser', config);
        //const json = await response.json()
        if (response.ok) {
          console.log("success on send.");

        } else {
          alert("launch: failure on send!");
        }
        try {
          const data = await response.json();
          console.log("on reply:")
          console.log(data);
          alert(data);
          this.props.history.push('/');
          return;

        } catch (err) {
          console.log(err);
          alert("exception on reply!");
          return;
        }

      } catch (error) {

      }
    };
  }

  render() {
    const { value1, value2, value3 } = this.state;

    return (
    <Bullseye style={{
      backgroundColor: 'grey'
    }}> 
      <Form  style={{
      backgroundColor: 'white',
      margin: "20px 20px 20px 20px",
      padding: "20px 20px 20px 20px"
    }}
    onSubmit = {this.handleSignUp} noValidate
    >
        <FormGroup
          label="User Name"
          labelIcon={
            <Popover
              headerContent={
                <div>
                  The{' '}
                  <a href="https://schema.org/name" target="_blank" rel="noreferrer">
                    name
                  </a>{' '}
                  of a{' '}
                  <a href="https://schema.org/Person" target="_blank" rel="noreferrer">
                    Person
                  </a>
                </div>
              }
              bodyContent={
                <div>
                  Often composed of{' '}
                  <a href="https://schema.org/givenName" target="_blank" rel="noreferrer">
                    givenName
                  </a>{' '}
                  and{' '}
                  <a href="https://schema.org/familyName" target="_blank" rel="noreferrer">
                    familyName
                  </a>
                  .
                </div>
              }
            >
              <button
                type="button"
                aria-label="More info for name field"
                onClick={e => e.preventDefault()}
                aria-describedby="simple-form-name-01"
                className="pf-c-form__group-label-help"
              >
                <HelpIcon noVerticalAlign />
              </button>
            </Popover>
          }
          isRequired
          fieldId="simple-form-name-01"
          helperText="Please provide your user name"
        >
          <TextInput
            isRequired
            type="text"
            id="simple-form-name-01"
            name="simple-form-name-01"
            aria-describedby="simple-form-name-01-helper"
            value={value1}
            onChange={this.handleTextInputChange1}
          />
        </FormGroup>
        <FormGroup label="Email" isRequired fieldId="simple-form-email-01">
          <TextInput
            isRequired
            type="email"
            id="simple-form-email-01"
            name="simple-form-email-01"
            value={value2}
            onChange={this.handleTextInputChange2}
          />
        </FormGroup>
        <FormGroup label="Password" isRequired fieldId="simple-form-number-01">
          <TextInput
            isRequired
            type="password"
            id="simple-form-number-01"
            name="simple-form-number-01"
            value={value3}
            onChange={this.handleTextInputChange3}
          />
        </FormGroup>
        <ActionGroup>
          <Button
                type="submit"
                color="primary"
              >
                {'Sign up'}
          </Button>
          <Button variant="link" onClick={() => this.handleHistory()}>Cancel</Button>
        </ActionGroup>
      </Form>
     </Bullseye> 
    );
  }
}