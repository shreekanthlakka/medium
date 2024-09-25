"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omitFields = void 0;
const omitFields = (user, fields) => {
    const result = Object.assign({}, user);
    fields.forEach((field) => {
        delete result[field];
    });
    return result;
};
exports.omitFields = omitFields;
