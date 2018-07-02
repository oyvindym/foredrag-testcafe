import React from 'react';

import Button from './Button';
import {
  birthdayValidator,
  emailValidator,
  notBlankValidator,
  phoneNumberValidator,
  zipCodeValidator
} from '../services/validator-service';
import InputField from './AlignedInputField';

const ContactInformation = ({
  address,
  birthday,
  city,
  country,
  email,
  firstName,
  onChange,
  onSubmit,
  phoneNumber,
  surname,
  touched,
  zipCode
}) => (
  <form className="pure-form pure-form-aligned" onSubmit={onSubmit}>
    <fieldset>
      <InputField
        label="Fornavn"
        name="firstName"
        value={firstName}
        type="text"
        touched={touched}
        validator={notBlankValidator}
        onChange={e => onChange('firstName', e.target.value)}
      />

      <InputField
        label="Etternavn"
        name="surname"
        value={surname}
        type="text"
        touched={touched}
        validator={notBlankValidator}
        onChange={e => onChange('surname', e.target.value)}
      />

      <InputField
        label="Fødselsdag"
        name="birthday"
        value={birthday}
        type="text"
        validator={birthdayValidator}
        touched={touched}
        onChange={e => onChange('birthday', e.target.value)}
      />

      <InputField
        label="E-post"
        name="email"
        value={email}
        type="text"
        validator={emailValidator}
        touched={touched}
        onChange={e => onChange('email', e.target.value)}
      />

      <InputField
        label="Telefonnummer"
        name="phoneNumber"
        value={phoneNumber}
        type="text"
        validator={phoneNumberValidator}
        touched={touched}
        onChange={e => onChange('phoneNumber', e.target.value)}
      />

      <InputField
        label="Adresse"
        name="address"
        value={address}
        type="text"
        touched={touched}
        validator={notBlankValidator}
        onChange={e => onChange('address', e.target.value)}
      />

      <InputField
        label="Postnummer"
        name="zipCode"
        value={zipCode}
        type="text"
        validator={zipCodeValidator}
        touched={touched}
        onChange={e => onChange('zipCode', e.target.value)}
      />

      <InputField
        label="By"
        name="city"
        value={city}
        type="text"
        touched={touched}
        validator={notBlankValidator}
        onChange={e => onChange('city', e.target.value)}
      />

      <InputField
        label="Land"
        name="country"
        value={country}
        type="text"
        touched={touched}
        validator={notBlankValidator}
        onChange={e => onChange('country', e.target.value)}
      />

      <Button type="submit" label="Registrer meg" />
    </fieldset>
  </form>
);

export default ContactInformation;
