export const StringLength = {
  VALID: 1,
  WRONG: 2,
  REQUIRED: 0,
};

export const DefaultStringLength = {
  MIN: 2,
  MAX: 30,
};

export const StringLengthValidity = {
  [StringLength.VALID]: '',
  [StringLength.WRONG]: 'Должно быть от 2 до 30 символов',
  [StringLength.REQUIRED]: 'Это обязательное поле',
};

export const Validator = {
  STRING: 'string',
  URL: 'url',
};
