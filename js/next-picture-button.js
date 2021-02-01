// @ts-check

/**
 * The component that handles next picture requests
 * @extends {HTMLElement}
 */
export class NextPictureButton extends HTMLElement {
  constructor() {
    super();

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('name', 'next-picture');
    button.setAttribute('class', 'button');

    const span = document.createElement('span');
    span.textContent = 'Show next picture';
    button.appendChild(span);
    this.appendChild(button);
  }


}

/**
 * Register the button component
 */
export const registerNextPictureButton = () => customElements.define('next-picture-button', NextPictureButton);