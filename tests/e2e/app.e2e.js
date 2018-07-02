import { Selector } from 'testcafe';
import { ReactSelector, waitForReact } from 'testcafe-react-selectors';

const FIRST_NAME = 'First name';
const SURNAME = 'Surname';
const BIRTHDAY = '1970-01-01';
const EMAIL = 'email@domain.com';
const PHONE_NUMBER = '12345678';
const ADDRESS = 'Street 1';
const ZIP_CODE = '0000';
const COUNTRY = 'Country';

fixture`User registration`
  .page('http://localhost:8088')
  .beforeEach(async () => {
    await waitForReact();
  });

class Page {
  constructor() {
    this.submitButton = ReactSelector('Button').find('button');
    this.inputFields = ReactSelector('InputField');
    this.errorMessages = ReactSelector('ErrorMessage');
    this.successMessage = Selector('h1');
  }

  getInputField(name) {
    return this.inputFields.find(`[name=${name}]`);
  }
}

const page = new Page();

test('User can register to our page and will see message about email confirmation', async t => {
  await t
    .maximizeWindow()
    .typeText(page.getInputField('firstName'), FIRST_NAME)
    .typeText(page.getInputField('surname'), SURNAME)
    .typeText(page.getInputField('birthday'), BIRTHDAY)
    .typeText(page.getInputField('email'), EMAIL)
    .typeText(page.getInputField('phoneNumber'), PHONE_NUMBER)
    .typeText(page.getInputField('address'), ADDRESS)
    .typeText(page.getInputField('zipCode'), ZIP_CODE)
    .typeText(page.getInputField('country'), COUNTRY)
    .expect(page.errorMessages.exists)
    .notOk()
    .click(page.submitButton)
    .expect(page.successMessage.textContent)
    .match(new RegExp(EMAIL));
});
