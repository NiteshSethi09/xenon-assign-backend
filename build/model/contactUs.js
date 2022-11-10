"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateForm = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const ContactSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });
function validateForm(object) {
    const { error } = joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        description: joi_1.default.string().trim().required(),
    }).validate(object);
    if (error)
        return error.details[0].message;
}
exports.validateForm = validateForm;
exports.default = (0, mongoose_1.model)("Contact", ContactSchema);
