import eventBus from './event-bus.js';

let result;
let callback;

describe('eventBus', () => {
  beforeEach(() => {
    callback = (e) => { result = e; };
    eventBus.register('test', callback);
  });

  afterEach(() => eventBus.remove('test', callback));

  it('fires event to registered listener', async () => {
    eventBus.fire('test');
    expect(result).not.toBe(null);
    expect(result.isTrusted).toBe(false);
  });

  it('fires event with detail to registered listener', async () => {
    eventBus.fire('test', 'value');
    expect(result).not.toBe(null);
    expect(result.isTrusted).toBe(false);
  });
});
