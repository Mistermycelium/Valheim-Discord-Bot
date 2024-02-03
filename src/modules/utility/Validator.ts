class RegExValidator {
  static validateId(id: any, regex: RegExp, errorMessage: string | undefined) {
    if (!regex.test(id)) {
      throw new Error(errorMessage);
    }
  }
}

export default RegExValidator;
