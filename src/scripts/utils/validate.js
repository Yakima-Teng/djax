export function validateEmail (val) {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val);
}

export function validatePhone (val) {
  return /^1[3-8]\d{9}$/.test(val);
}
