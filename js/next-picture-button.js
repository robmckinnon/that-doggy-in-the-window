// @ts-check
import EventBus from './event-bus.js';

/**
 * The component that handles next picture requests
 * @extends {HTMLElement}
 */
export class NextPictureButton extends HTMLElement {
  constructor() {
    super();
    this._breed = 'shiba';

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('name', 'next-picture');
    button.setAttribute('class', 'button');

    const span = document.createElement('span');
    span.textContent = `Show next ${this._breed} picture`;
    button.appendChild(span);

    button.addEventListener('click', () => EventBus.fire('next-picture'));
    this.appendChild(button);

    this._changeBreed = (e) => {
      this._breed = e.detail;
      span.textContent = `Show next ${this._breed} picture`;
    };
  }

  /**
   * Called when the element is inserted into the DOM.
   */
  async connectedCallback() {
    EventBus.register('select-breed', this._changeBreed);
  }

  /**
   * Called when the element is removed from the DOM.
   */
  async disconnectedCallback() {
    EventBus.remove('select-breed', this._changeBreed);
  }
}

/**
 * Register the button component
 */
export const registerNextPictureButton = () => customElements.define('next-picture-button', NextPictureButton);
