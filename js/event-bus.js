// @ts-check

class EventBus {
  constructor() {
    this._bus = document.createElement('div');
  }

  /**
   * To add new event listener to the bus.
   * @param {string} eventName
   * @callback {EventListener}
   */
  register(eventName, callback) {
    this._bus.addEventListener(eventName, callback);
  }

  /**
   * To remove event listener from the bus.
   * @param {string} eventName
   * @callback {EventListener}
   */
  remove(eventName, callback) {
    this._bus.removeEventListener(eventName, callback);
  }

  /**
   * To fire event to listners.
   * @param {string} eventName
   * @param {*} myObj.detail
   */
  fire(eventName, detail = {}) {
    this._bus.dispatchEvent(new CustomEvent(eventName, { detail }));
  }
}

var bus = new EventBus();

export default bus;
