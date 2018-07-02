import { Selector } from 'testcafe';

fixture`Foodora test`.page('https://www.foodora.no/');

const ADDRESS = 'Street 1';
const FOOD = 'Desired food (e.g. burger)';

class FrontPage {
  constructor() {
    this.streetAdressInput = Selector('#delivery-information-postal-index');
    this.deliveryButton = Selector('.gtm-homepage-delivery-button');
  }
}

class RestaurantOverviewPage {
  constructor() {
    this.restaurantSearchInput = Selector('.restaurants-search-input');
    this.restaurantSearchLabel = Selector('.search-label');
    this.vendorList = Selector('.vendor-list');
  }

  getFirstRestaurant = () => this.vendorList.nth(0).find('li');
}

class RestaurantPage {
  constructor() {
    this.dishList = Selector('.dish-list');
    this.requiredSelections = Selector('.selection-required');
    this.addToCardButton = Selector('.js-toppings-add-to-cart');
    this.checkoutButton = Selector('.btn-checkout');
  }

  getFirstDish = () => this.dishList.find('.dish-card').nth(0);

  getRequiredSelectionsCount = () => this.requiredSelections.count;

  getRequiredSelectionByIndex = n => this.requiredSelections.nth(n);

  getFirstToppingForRequiredSelectionByIndex = n =>
    this.requiredSelections
      .nth(n)
      .find('.topping-option')
      .nth(0)
      .find('.js-topping-option-radio');
}

const frontPage = new FrontPage();
const restaurantsOverviewPage = new RestaurantOverviewPage();
const restaurantPage = new RestaurantPage();

test('User can order food from Foodora', async t => {
  await t
    .maximizeWindow()
    .typeText(frontPage.streetAdressInput, ADDRESS)
    .click(frontPage.deliveryButton)
    .click(restaurantsOverviewPage.restaurantSearchLabel)
    .typeText(restaurantsOverviewPage.restaurantSearchInput, FOOD)
    .wait(5000)
    .click(restaurantsOverviewPage.getFirstRestaurant())
    .expect(restaurantPage.dishList.exists)
    .ok()
    .click(restaurantPage.getFirstDish());

  const requiredSelectionsCount = await restaurantPage.getRequiredSelectionsCount();

  let i;
  for (i = 0; i < requiredSelectionsCount; i++) {
    const requiredSelection = await restaurantPage.getRequiredSelectionByIndex(
      i
    );
    if (!(await requiredSelection.hasClass('optionsVisible'))) {
      await t.click(requiredSelection);
    }
    await t.click(restaurantPage.getFirstToppingForRequiredSelectionByIndex(i));
  }

  await t
    .click(restaurantPage.addToCardButton)
    .wait(2000)
    .takeScreenshot(`Foodora ${new Date().toString()}`)
    .click(restaurantPage.checkoutButton)
    .wait(5000);
});
