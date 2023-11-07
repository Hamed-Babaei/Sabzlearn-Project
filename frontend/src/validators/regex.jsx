const testEmail = (value) => {
  const emailPattent = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/g;
  return emailPattent.test(value);
};

const testCodeMelli = (value) => {
  const melliCodePattent = /^[0-9]{10}$/g;
  return melliCodePattent.test(value);
};

const testPhoneNumber = (value) => {
  const phoneNumberPattent = /^((\+98|0)9\d{9})$/gm;
  return phoneNumberPattent.test(value);
};

export default {
  testEmail,
  testCodeMelli,
  testPhoneNumber,
};
