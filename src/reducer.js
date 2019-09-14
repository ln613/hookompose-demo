export default (state, action) => {
  switch (action.type) {
    case 'inc':
      return {count: state.count + 1};
    case 'dec':
      return {count: state.count - 1};
    default:
      return state;
  }
}