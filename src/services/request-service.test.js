import { buildUrl } from './request-service';

const BASE_URL = 'https://api.example.com';

describe('requestService', () => {
  it('should call generate correct url given params', () => {
    expect(buildUrl(BASE_URL, ['zip-codes'], { country: 'no' })).toBe(
      `${BASE_URL}/zip-codes?country=no`
    );
  });

  it('should handle multiple path params', () => {
    expect(buildUrl(BASE_URL, ['zip-codes', 'list'], { country: 'no' })).toBe(
      `${BASE_URL}/zip-codes/list?country=no`
    );
  });

  it('should handle multiple query params', () => {
    expect(
      buildUrl(BASE_URL, ['zip-codes'], { country: 'no', count: 20 })
    ).toBe(`${BASE_URL}/zip-codes?country=no&count=20`);
  });
});
