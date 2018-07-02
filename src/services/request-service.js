const DUMMY_ZIP_CODE_MAP = {
  '0000': 'City'
};

const simulateZipCodeFetching = zipCodeUrl => {
  console.log(`Fetching zip codes from ${zipCodeUrl}`);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(DUMMY_ZIP_CODE_MAP);
    }, 2000);
  });
};

const simulateNewUserRegistration = personalia => {
  console.log(
    `Registering new user with personalia ${JSON.stringify(personalia)}`
  );
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(personalia);
    }, 1500);
  });
};

export const buildUrl = (baseUrl, pathParams = [], queryParams = {}) => {
  const path = pathParams.reduce((acc, param) => `${acc}/${param}`, '');
  const query = Object.entries(queryParams).reduce((acc, [key, value]) => {
    if (acc) {
      return `${acc}&${key}=${value}`;
    }
    return `${key}=${value}`;
  }, '');
  return query ? `${baseUrl}${path}?${query}` : `${baseUrl}${path}`;
};

export const fetchZipCodes = async () =>
  simulateZipCodeFetching(
    buildUrl('https://api.example.com', ['zip-codes'], { count: 1 })
  );

export const registerNewUser = async personalia =>
  simulateNewUserRegistration(personalia);
