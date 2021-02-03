// @ts-check
// import EventBus from './event-bus.js';
import EventBus from './event-bus.js';
import { listAllBreeds, randomPicture } from './fetcher.js';

/**
 * The component that handles rendering grid of breeds to select from
 * @extends {HTMLElement}
 */
export class BreedSelection extends HTMLElement {
  constructor() {
    super();
    let spaceholder;
    for (let i = 0; i < 5; i++) {
      spaceholder = document.createElement('div');
      spaceholder.setAttribute('class', 'crop-height-150 flip');
      spaceholder.innerHTML = '<img class="img-responsive-size flip" src="./thumbnail-space.png">';
      this.appendChild(spaceholder);
    }
    this._selectBreed = (breed) => {
      EventBus.fire('select-breed', breed);
    };
  }

  /**
   * Register for previous-picture events when the element is inserted into the DOM.
   */
  async connectedCallback() {
    const allBreeds = await listAllBreeds();
    // ignore sub-breeds for now
    const breeds = Object.keys(allBreeds);
    breeds.forEach(breed => {
      const div = document.createElement('div');
      div.setAttribute('class', 'crop-height-150 flip');
      div.innerHTML = `
        <img id="${breed}" class="img-responsive-size flip" src="">
        <span class="img-responsive-size flip breed-label">${breed}</span>
      `;
      div.addEventListener('click', () => this._selectBreed(breed));
      this.appendChild(div);
    });

    const urls = await Promise.all(breeds.map(async (breed) => {
      return [breed, await randomPicture(breed)];
    }));
    let breed, url;
    urls.forEach((item) => {
      breed = item[0];
      url = item[1];
      document.getElementById(breed).setAttribute('src', url);
    });
  }
}

/**
 * Register the custom component
 */
export const registerBreedSelection = () => customElements.define('breed-selection', BreedSelection);
