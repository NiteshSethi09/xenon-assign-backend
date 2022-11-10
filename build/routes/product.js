"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = __importStar(require("../model/product"));
const common_1 = require("../model/common");
const router = (0, express_1.Router)();
router.get("/get-products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield product_1.default.find().select("-createdAt -updatedAt -__v");
    res.json({ error: false, data });
}));
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errorMessage = (0, product_1.validateProduct)(req.body);
    if (errorMessage) {
        return res.json({ error: true, message: errorMessage });
    }
    const { title, description, imageUrl, price } = req.body;
    if (yield product_1.default.findOne({ title })) {
        return res
            .status(400)
            .json({ error: true, message: "Product already exists" });
    }
    product_1.default.create({
        title,
        description,
        imageUrl,
        price,
    })
        .then(() => res.json({ error: false, message: "Product Created!" }))
        .catch((e) => res.json({ error: true, message: e.message }));
}));
router.delete("/delete-by-id", (req, res) => {
    const { id, autheticated } = req.body;
    if (!(0, common_1.validateId)(id) || !autheticated) {
        return res.json({
            error: true,
            message: "Failed to delete the product. Please retry!",
        });
    }
    product_1.default.findByIdAndRemove(id)
        .then(() => res.json({ error: false, message: "Product deleted." }))
        .catch((e) => res.json({ error: true, message: e.message }));
});
exports.default = router;
