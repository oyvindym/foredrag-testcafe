export const birthdayValidator = birthday =>
  /^\d{4}-\d{2}-\d{2}$/.test(birthday);

export const zipCodeValidator = zipCode => /^\d{4}$/.test(zipCode);

export const emailValidator = email =>
  /^[a-z]{2,}@[a-z]{2,}\.[a-z]{2,}$/.test(email);

export const phoneNumberValidator = phoneNumber => /^\d{8}$/.test(phoneNumber);

export const notBlankValidator = content =>
  typeof content === 'string' && content.trim() !== '';
