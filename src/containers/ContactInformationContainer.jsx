import React, { Component } from 'react';

import ContactInformation from '../components/ContactInformation';
import PageWithText from '../components/PageWithText';
import { fetchZipCodes, registerNewUser } from '../services/request-service';
import {
  birthdayValidator,
  emailValidator,
  phoneNumberValidator,
  zipCodeValidator,
  notBlankValidator
} from '../services/validator-service';

class ContactInformationContainer extends Component {
  state = {
    address: '',
    birthday: '',
    city: '',
    country: '',
    email: '',
    firstName: '',
    isSubmitting: false,
    phoneNumber: '',
    success: false,
    surname: '',
    touched: false,
    zipCode: '',
    zipCodes: {}
  };

  async componentWillMount() {
    try {
      const zipCodes = await fetchZipCodes();
      this.setState({ isInitialDataLoaded: true, zipCodes });
    } catch (err) {
      this.setState({ isError: true });
    }
  }

  isValidForm = () => {
    const {
      address,
      birthday,
      city,
      country,
      email,
      firstName,
      phoneNumber,
      surname,
      zipCode
    } = this.state;
    return (
      birthdayValidator(birthday) &&
      emailValidator(email) &&
      notBlankValidator(address) &&
      notBlankValidator(city) &&
      notBlankValidator(country) &&
      notBlankValidator(firstName) &&
      notBlankValidator(surname) &&
      phoneNumberValidator(phoneNumber) &&
      zipCodeValidator(zipCode)
    );
  };

  handleChange = (key, value) => {
    if (/zipCode/.test(key)) {
      const { zipCodes } = this.state;
      this.handleChange('city', zipCodes[value]);
    }
    this.setState({ [key]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { touched, ...personalia } = this.state;
    if (this.isValidForm()) {
      this.setState({ isSubmitting: true });
      try {
        await registerNewUser(personalia);
        this.setState({ success: true });
      } catch (err) {
        this.setState({ isError: true });
      } finally {
        this.setState({ isSubmitting: false });
      }
    } else {
      this.setState({ touched: true });
    }
  };

  render() {
    const {
      isInitialDataLoaded,
      isError,
      isSubmitting,
      success,
      touched,
      ...personalia
    } = this.state;

    if (isError) {
      return <PageWithText text="Noe gikk galt :(" />;
    }
    if (!isInitialDataLoaded) {
      return <PageWithText text="Laster inn..." />;
    }
    if (isSubmitting) {
      return <PageWithText text="Registrerer ny bruker..." />;
    }

    if (success) {
      return (
        <PageWithText
          text={`En e-postbekreftelse har blitt sendt til ${personalia.email}`}
        />
      );
    }

    return (
      <ContactInformation
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        touched={touched}
        {...personalia}
      />
    );
  }
}

export default ContactInformationContainer;
