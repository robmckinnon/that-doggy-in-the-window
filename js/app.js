import { registerViewer } from './viewer.js';

/**
 * Register web components
 *
 * One of the key features of the Web Components standard is the ability to
 * create custom elements via the Custom Elements API that encapsulate your
 * functionality on an HTML page.
 * Note: Custom elements are supported by default in Firefox, Chrome, and Edge (76).
 * Opera and Safari so far support only autonomous custom elements.
 */
const app = async () => {
  console.log('there');
  registerViewer();
};

document.addEventListener('DOMContentLoaded', app);