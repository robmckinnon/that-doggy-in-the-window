// @ts-check
import EventBus from './event-bus.js';

/**
 * The component that handles rendering the main picture
 * @extends {HTMLElement}
 */
export class PreviousDisplayedDoggies extends HTMLElement {
  constructor() {
    super();
    const header = document.createElement('h2');
    header.textContent = 'previous pictures';
    header.setAttribute('style', 'display: none;');
    this.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'grid-container';
    let spaceholder;
    for (let i = 0; i < 5; i++) {
      spaceholder = document.createElement('div');
      spaceholder.setAttribute('class', 'crop-height-150 flip');
      spaceholder.innerHTML = '<img class="img-responsive-size flip" src="./thumbnail-space.png">';
      grid.appendChild(spaceholder);
    }
    this.appendChild(grid);

    this._urls = new Set();
    this._addPreviousPicture = async (e) => {
      const url = e.detail;
      if (this._urls.has(url)) return;
      this._urls.add(url);
      const div = document.createElement('div');
      div.setAttribute('class', 'crop-height-150 flip');
      div.innerHTML = `<img class="img-responsive-size flip" src="${url}">`;

      console.log(grid.childNodes.length);
      if (grid.childNodes.length == 5) {
        header.setAttribute('style', 'display: block');
        grid.insertBefore(div, grid.childNodes[0]);
      } else {
        grid.insertBefore(div, grid.childNodes[0]);
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
 * Register the custom component
 */
export const registerPreviousDisplayedDoggies = () => customElements.define('previous-displayed-doggies', PreviousDisplayedDoggies);
