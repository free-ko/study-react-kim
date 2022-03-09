function createStore() {
  let state;
  let handlers = [];

  function send(action) {
    state = worker(state, action);
    handlers.forEach(handler => handler());
  }

  function subscribe(handler) {
    handlers.push(handler);
  }

  function getState() {
    return state;
  }

  return {
    send,
    getState,
    subscribe
  };
}

function worker(state = { count: 0 }, action) {
  // do something
  switch (action.type) {
    case 'increase':
      return { ...state, count: state.count + 1 }
    default:
      return { ...state };
  }
}

const store = createStore(worker);

// 함수 구독(등록)
store.subscribe(function () {
  store.getState();
})

store.send({ type: "increase" });
store.send({ type: "increase" });
