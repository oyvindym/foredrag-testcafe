import {
  birthdayValidator,
  emailValidator,
  phoneNumberValidator,
  zipCodeValidator,
  notBlankValidator
} from './validator-service';

describe('validatorService', () => {
  describe('birthdayValidator', () => {
    it('should validate date with format YYYY-MM-DD', () => {
      expect(birthdayValidator('1990-01-01')).toBe(true);
    });

    it('should invalidate empty dates', () => {
      expect(birthdayValidator('')).toBe(false);
    });

    it('should invalidate norwegian date format', () => {
      expect(birthdayValidator('01.01.1990')).toBe(false);
    });

    it('should invalidate french date format', () => {
      expect(birthdayValidator('01-01-1990')).toBe(false);
    });
  });

  describe('zipCodeValidator', () => {
    it('should validate four digit zip codes', () => {
      expect(zipCodeValidator('1234')).toBe(true);
    });

    it('should invalidate empty zip codes', () => {
      expect(zipCodeValidator('')).toBe(false);
    });

    it('should invalidate zip codes containing letters', () => {
      expect(zipCodeValidator('a123')).toBe(false);
    });

    it('should invalidate zip codes containing symbols', () => {
      expect(zipCodeValidator('@123')).toBe(false);
    });
  });

  describe('emailValidator', () => {
    it('should validate regular emails', () => {
      expect(emailValidator('email@domain.com')).toBe(true);
    });

    it('should invalidate emails with several domains (e.g. co.uk)', () => {
      expect(emailValidator('email@sub.domain.com')).toBe(false);
    });

    it('should invalidate emails without @', () => {
      expect(emailValidator('email.domain.com')).toBe(false);
    });

    it('should invalidate empty emails', () => {
      expect(emailValidator('')).toBe(false);
    });
  });

  describe('phoneNumberValidator', () => {
    it('should validate 8-digit phone numbers', () => {
      expect(phoneNumberValidator('12345678')).toBe(true);
    });

    it('should invalidate phone numbers with less than 8-digits', () => {
      expect(phoneNumberValidator('1234567')).toBe(false);
    });

    it('should invalidate phone numbers with more than 8-digits', () => {
      expect(phoneNumberValidator('123456789')).toBe(false);
    });

    it('should invalidate phone numbers containing letters', () => {
      expect(phoneNumberValidator('123HOMER')).toBe(false);
    });

    it('should invalidate phone numbers containing symbols', () => {
      expect(phoneNumberValidator('@2345678')).toBe(false);
    });
  });

  describe('notBlankValidator', () => {
    it('should validate any content', () => {
      expect(notBlankValidator('1')).toBe(true);
    });

    it('should invalidate only spaces', () => {
      expect(notBlankValidator(' ')).toBe(false);
    });

    it('should invalidate null values', () => {
      expect(notBlankValidator(null)).toBe(false);
    });

    it('should invalidate empty strings', () => {
      expect(notBlankValidator('')).toBe(false);
    });
  });
});
