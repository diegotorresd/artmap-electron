class ObservableArray {
  constructor() {
    self.data = new Map();
    self.listeners = new Map();
  }

  addListener(listener) {
    const MAX_LISTENERS = 10;
    function* getId() {
      let i = 0;
      if (i == MAX_LISTENERS) i = 0;
      yield i++;
    }
    let idGen = getId();
    let id = idGen.next().value;
    self.listeners.set(id, listener);
    return id;
  }

  removeListener(id) {
    self.listeners.delete(id);
  }

  add(obj) {
    self.data.set(obj.name, obj);
    for (var listener of self.listeners.values())
      listener.added_element(obj.name);
  }

  remove(obj) {
    self.data.delete(obj.name);
    for (var listener of self.listeners.values())
      listener.removed_element(obj.name);
  }
}

module.exports = ObservableArray;
