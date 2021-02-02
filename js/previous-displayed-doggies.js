// @ts-check
import EventBus from './event-bus.js';

/**
 * The component that handles rendering the main picture
 * @extends {HTMLElement}
 */
export class PreviousDisplayedDoggies extends HTMLElement {
  constructor() {
    super();
    // <div class="crop-height flip">
    //
    // </div>
    this.appendChild(document.createElement('div'));
    this.appendChild(document.createElement('div'));
    this.appendChild(document.createElement('div'));
    this.appendChild(document.createElement('div'));
    this._urls = new Set();
    this._addPreviousPicture = async (e) => {
      const url = e.detail;
      if (this._urls.has(url)) return;
      this._urls.add(url);
      const div = document.createElement('div');
      div.setAttribute('class', 'crop-height-150 flip');
      div.innerHTML = `<img class="img-responsive-size flip" src="${url}">`;
      if (this.childNodes.length == 0) {
        this.appendChild(div);
      } else {
        this.insertBefore(div, this.childNodes[0]);
      }
    };
  }

  /**
   * Register for previous-picture events when the element is inserted into the DOM.
   */
  async connectedCallback() {
    EventBus.register('previous-picture', this._addPreviousPicture);
  }

  /**
   * Deregister for events when the element is removed from the DOM.
   */
  async disconnectedCallback() {
    EventBus.remove('previous-picture', this._addPreviousPicture);
  }
}

/**
 * Register the custom viewer component
 */
export const registerPreviousDisplayedDoggies = () => customElements.define('previous-displayed-doggies', PreviousDisplayedDoggies);
