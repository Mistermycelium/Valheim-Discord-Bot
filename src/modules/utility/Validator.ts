class Validator {
  static validateId(id, regex, errorMessage) {
    if (!regex.test(id)) {
      throw new Error(errorMessage);
    }
  }
}

export default Validator;
