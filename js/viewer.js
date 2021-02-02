// @ts-check
import EventBus from './event-bus.js';
import { listByBreed } from './fetcher.js';

/**
 * The component that handles rendering the main picture
 * @extends {HTMLElement}
 */
export class Viewer extends HTMLElement {
  constructor() {
    super();

    this._index = 0;
    this._img = document.createElement('img');
    this._img.setAttribute('class', 'img-responsive-size flip');
    this._img.src = this.hasAttribute('img') ? this.getAttribute('img') : 'https://images.dog.ceo/breeds/shiba/shiba-10.jpg';
    this.appendChild(this._img);

    this._nextPicture = async () => {
      const urls = await listByBreed('shiba');

      if (urls != null) {
        this._img.setAttribute('src', urls[this._index % urls.length]);
        this._index = this._index + 1;
      }
    };
  }

  /**
   * Called when the element is inserted into the DOM.
   */
  async connectedCallback() {
    EventBus.register('next-picture', this._nextPicture);
  }

  /**
   * Called when the element is removed from the DOM.
   */
  async disconnectedCallback() {
    EventBus.remove('next-picture', this._nextPicture);
  }
}

/**
 * Register the custom viewer component
 */
export const registerViewer = () => customElements.define('doggy-viewer', Viewer);
