class Debug {
  constructor(debug) {
    this.debug = debug;
  }

  log(obj) {
    this[Symbol.for('out')](obj);
  }

  [Symbol.for('out')](obj) {
    if (!this.debug) {
      return;
    }
    console.log(obj);
  }
}
export default new Debug(__ENV__ === 'development');
