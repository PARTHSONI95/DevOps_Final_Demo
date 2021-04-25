import React from 'react';
import { Bullseye } from '@patternfly/react-core';
import { Form, FormGroup, TextInput, Checkbox, Popover, ActionGroup, Button } from '@patternfly/react-core';
import HelpIcon from '@patternfly/react-icons/dist/js/icons/help-icon';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value1: '',
      value2: '',
      value3: ''
    };
    this.handleTextInputChange1 = value1 => {
      this.setState({ value1 });
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
    }}>
        <FormGroup
          label="User Name"
          labelIcon={
            <Popover
              headerContent={
                <div>
                  The{' '}
                  <a href="https://schema.org/name" target="_blank">
                    name
                  </a>{' '}
                  of a{' '}
                  <a href="https://schema.org/Person" target="_blank">
                    Person
                  </a>
                </div>
              }
              bodyContent={
                <div>
                  Often composed of{' '}
                  <a href="https://schema.org/givenName" target="_blank">
                    givenName
                  </a>{' '}
                  and{' '}
                  <a href="https://schema.org/familyName" target="_blank">
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