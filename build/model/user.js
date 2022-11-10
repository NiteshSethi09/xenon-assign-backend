"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
function validateUser(object) {
    const { error } = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        name: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
    }).validate(object);
    if (error)
        return error.details[0].message;
}
exports.validateUser = validateUser;
exports.default = (0, mongoose_1.model)("User", userSchema);
