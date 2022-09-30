import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import UserService from "../services/UserService";

class UserComponentDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      firstName: "",
      lastName: "",
      email: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }
  componentDidMount() {
    console.log(this.state.id);
    // eslint-disable-next-line
    if (this.state.id == -1) {
      return;
    }
    UserService.retriveUser(this.state.id).then((response) =>
      this.setState({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
      })
    );
  }
  validate(values) {
    let errors = {};
    if (!values.firstName) {
      errors.description = "Enter a Description";
    } else if (values.firstName.length < 3) {
      errors.description = "Enter at least 3 Characters in Description";
    }
    return errors;
  }
  onSubmit(values) {
    console.log(this.state.id);
    let user = {
      id: this.state.id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    };
    if (this.state.id == -1) {
      UserService.createUser(user).then(() =>
        this.props.history.push("")
      );
    } else {
      UserService.updateUser(this.state.id, user).then(() =>
        this.props.history.push("")
      );
    }
    console.log(values);
  }
  render() {
    let { firstName, lastName, email, id } = this.state;
    return (
      <div>
        <h3>User</h3>
        <div className='container'>
          <Formik
            initialValues={this.state}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {(props) => (
              <Form>
                <ErrorMessage
                  name='description'
                  component='div'
                  className='alert alert-warning'
                />
                <fieldset className='form-group'>
                  <label>Id</label>
                  <Field
                    className='form-control'
                    type='text'
                    name='id'
                    disabled
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <label>FirstName</label>
                  <Field
                    className='form-control'
                    type='text'
                    name='firstName'
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <label>LastName</label>
                  <Field className='form-control' type='text' name='lastName' />
                </fieldset>
                <fieldset className='form-group'>
                  <label>Email</label>
                  <Field className='form-control' type='text' name='email' />
                </fieldset>
                <button className='btn btn-success' type='submit'>
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default UserComponentDetails;
