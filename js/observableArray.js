class ObservableArray {
  constructor() {
    self.data = new Map();
    self.listener = undefined;
  }

  addListener(listener) {
    // const MAX_LISTENERS = 10;
    // function* getId() {
    //   let i = 0;
    //   if (i == MAX_LISTENERS) i = 0;
    //   while (i < MAX_LISTENERS) yield i++;
    // }
    // let idGen = getId();
    // let id = idGen.next().value;
    // self.listeners.set(id, listener);
    self.listener = listener;
  }

  removeListener(id) {
    self.listener = undefined;
  }

  add(obj) {
    self.data.set(self.data.size, obj);
    listener.added_element(obj);
  }

  remove(obj) {
    self.data.delete(obj.name);
    listener.removed_element(obj.name);
  }
}

module.exports = ObservableArray;
