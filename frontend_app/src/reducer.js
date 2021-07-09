export const reducer = (state, action) => {
  if (action.type == "set-account") {
    return {
      address: action.payload.address,
      passphrase: action.payload.passphrase,
    };
  }
  if (action.type == "remove-account") {
    return {
      address: "",
      passphrase: "",
    };
  }
};
