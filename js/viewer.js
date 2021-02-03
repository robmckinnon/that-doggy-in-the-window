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
    this.appendChild(this._img);
    this._breed = 'shiba';

    this._changeBreed = (e) => {
      this._breed = e.detail;
      this._nextPicture();
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    this._nextPicture = async () => {
      const urls = await listByBreed(this._breed);

      if (urls != null) {
        const previous = this._img.getAttribute('src');
        if (previous) {
          EventBus.fire('previous-picture', this._img.getAttribute('src'));
        }
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
    EventBus.register('select-breed', this._changeBreed);
    this._nextPicture();
  }

  /**
   * Called when the element is removed from the DOM.
   */
  async disconnectedCallback() {
    EventBus.remove('next-picture', this._nextPicture);
    EventBus.remove('select-breed', this._changeBreed);
  }
}

/**
 * Register the custom viewer component
 */
export const registerViewer = () => customElements.define('doggy-viewer', Viewer);
