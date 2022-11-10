"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProduct = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    imageUrl: { type: String, required: true },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
function validateProduct(object) {
    const { error } = joi_1.default.object({
        title: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        imageUrl: joi_1.default.string().required(),
        price: joi_1.default.number().required(),
    }).validate(object);
    if (error)
        return error.details;
}
exports.validateProduct = validateProduct;
exports.default = (0, mongoose_1.model)("Product", productSchema);
