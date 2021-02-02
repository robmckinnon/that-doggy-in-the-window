// @ts-check
import EventBus from './event-bus.js';
import { randomPicture } from './fetcher.js';

/**
 * The component that handles rendering the main picture
 * @extends {HTMLElement}
 */
export class Viewer extends HTMLElement {
  constructor() {
    super();

    this._img = document.createElement('img');
    this._img.setAttribute('class', 'img-responsive-size flip');
    this._img.src = this.hasAttribute('img') ? this.getAttribute('img') : 'https://images.dog.ceo/breeds/shiba/shiba-10.jpg';
    this.appendChild(this._img);

    this._nextPicture = async (e) => {
      const url = await randomPicture('shiba');
      if (url != null) {
        this._img.setAttribute('src', url);
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
