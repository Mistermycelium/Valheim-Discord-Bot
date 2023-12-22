"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validator {
    static validateId(id, regex, errorMessage) {
        if (!regex.test(id)) {
            throw new Error(errorMessage);
        }
    }
}
exports.default = Validator;
