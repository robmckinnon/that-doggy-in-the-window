import { registerViewer } from './viewer.js';

test('show a picture of a Shiba', async () => {
  window.document.body.innerHTML = `
     <doggy-viewer id="main" breed="shiba"></doggy-viewer>
  `;
  registerViewer();
  const main = document.getElementById('main');
  expect(main.innerHTML).toBe('<img class="img-responsive-size flip" ' +
    'src="https://images.dog.ceo/breeds/shiba/shiba-10.jpg">');
});
