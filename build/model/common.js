"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateId = void 0;
const mongoose_1 = require("mongoose");
function validateId(id) {
    return (0, mongoose_1.isValidObjectId)(id);
}
exports.validateId = validateId;
