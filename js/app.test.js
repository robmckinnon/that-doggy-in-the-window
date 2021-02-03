import * as jfm from 'jest-fetch-mock';
jfm.default.enableFetchMocks();
import { initApp } from './app.js';

const flushPromises = () => new Promise(setImmediate);

describe('app', () => {
  beforeAll(() => initApp());

  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify({
      message: [
        'https://images.dog.ceo/breeds/shiba/shiba-22.jpg',
        'https://images.dog.ceo/breeds/shiba/shiba-23.jpg'
      ],
      status: 'success'
    }));
  });

  afterEach(() => window.document.body.innerHTML = '');

  it('shows a picture of a Shiba', async () => {
    window.document.body.innerHTML = `
       <doggy-viewer id="main" breed="shiba"></doggy-viewer>
    `;
    expect(window.document.getElementById('main').innerHTML).toBe('<img class="img-responsive-size flip">');
    flushPromises();
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('https://dog.ceo/api/breed/shiba/images');
  });

  it('changes picture when next picture button clicked', async () => {
    window.document.body.innerHTML = `
       <doggy-viewer id="main2"></doggy-viewer>
       <next-picture-button id="button"/>
    `;
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('https://dog.ceo/api/breed/shiba/images');

    const button = window.document.querySelector('button');
    button.click();
    flushPromises();
    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[1][0]).toEqual('https://dog.ceo/api/breed/shiba/images');
  });
});
