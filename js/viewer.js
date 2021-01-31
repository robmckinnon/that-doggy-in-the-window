// @ts-check

/**
 * The component that handles rendering the main picture
 * @extends {HTMLElement}
 */
export class Viewer extends HTMLElement {
  constructor() {
    super();

    const img = document.createElement('img');
    img.setAttribute('class', 'img-responsive-size flip');
    img.src = this.hasAttribute('img') ? this.getAttribute('img') : 'https://images.dog.ceo/breeds/shiba/shiba-10.jpg';
    this.innerHTML = img.outerHTML;
  }
}

/**
 * Register the custom viewer component
 */
export const registerViewer = () => customElements.define('doggy-viewer', Viewer);
