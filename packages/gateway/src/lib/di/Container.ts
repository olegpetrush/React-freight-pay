export default class Container {
  services: any;

  constructor() {
    this.services = {};
  }

  has(id: any) {
    return !!this.services[id];
  }

  register(id: any, service: any) {
    this.services[id] = service;
  }

  get(id: any) {
    if (!this.services[id]) {
      return null;
    }

    return this.services[id];
  }
}
