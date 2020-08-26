export const isEmailValid = (email) => {
  return email !== null && email.length > 6;
};

export const isPasswordValid = (password) => {
  return password !== null && password.length > 6;
};

export const arePasswordsMatching = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const isItemNameValid = (itemName) => {
  return itemName !== '' && itemName.length > 0;
};

export const isBagNameValid = (bagName) => {
  return isItemNameValid(bagName)
};

export const isItemDescriptionValid = (itemDescription) => {
  return true;
};

export const isBagDescriptionValid = (bagDescription) => {
  return isItemDescriptionValid(bagDescription);
};

export const isItemQuantityValid = (quantity) => {
  return quantity > 0;
};
