import * as jfm from 'jest-fetch-mock';
jfm.default.enableFetchMocks();
import { initApp } from './app.js';

const flushPromises = () => new Promise(setImmediate);

describe('app', () => {
  beforeAll(() => initApp());

  beforeEach(() => fetch.resetMocks());

  afterEach(() => window.document.body.innerHTML = '');

  it('shows a picture of a Shiba', async () => {
    window.document.body.innerHTML = `
       <doggy-viewer id="main" breed="shiba"></doggy-viewer>
    `;
    expect(window.document.getElementById('main').innerHTML).toBe('<img class="img-responsive-size flip" ' +
      'src="https://images.dog.ceo/breeds/shiba/shiba-10.jpg">');
  });

  it('changes picture when next picture button clicked', async () => {
    fetch.mockResponseOnce(JSON.stringify({
      message: 'https://images.dog.ceo/breeds/shiba/shiba-22.jpg',
      status: 'success'
    }));
    window.document.body.innerHTML = `
       <doggy-viewer id="main2" breed="shiba"></doggy-viewer>
       <next-picture-button id="button"/>
    `;
    const button = window.document.querySelector('button');
    button.click();
    flushPromises();

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('https://dog.ceo/api/breed/shiba/images/random');
  });
});
