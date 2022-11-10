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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importStar(require("../model/user"));
const contactUs_1 = __importStar(require("../model/contactUs"));
const router = (0, express_1.Router)();
const SECRET = "$Randon/key";
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email, password, confirmPassword } = req.body;
    const errorMessage = (0, user_1.validateUser)({ name, email, password });
    if (errorMessage) {
        return res.json({ error: true, message: errorMessage });
    }
    if (password !== confirmPassword) {
        return res.json({
            error: true,
            message: "Please make sure you are entering the right passwords.",
        });
    }
    if (yield user_1.default.findOne({ email })) {
        return res.json({
            error: true,
            message: "Please make sure you are using the right Email.",
        });
    }
    const salt = yield bcryptjs_1.default.genSalt(12);
    password = yield bcryptjs_1.default.hash(password, salt);
    user_1.default.create({ name, email, password })
        .then(() => res.json({ error: false, message: "User created successfully." }))
        .catch((e) => res.json({ error: true, message: e.message }));
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({
            error: true,
            message: "Please provide the email and password!",
        });
    }
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        return res.json({
            error: true,
            message: "Entered information is wrong!",
        });
    }
    const token = (0, jsonwebtoken_1.sign)({ _id: user._id }, SECRET);
    if (yield bcryptjs_1.default.compare(password, user.password)) {
        res
            .cookie("access_token", token)
            .json({ error: false, message: "User found", data: user._id });
    }
    else {
        res.json({
            error: true,
            message: "User not found. Please check the credentials.",
        });
    }
}));
router.post("/contact-us", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, description } = req.body;
    const errorMessage = (0, contactUs_1.validateForm)({ name, email, description });
    if (errorMessage) {
        return res.json({ error: true, message: errorMessage });
    }
    contactUs_1.default
        .create({ name, email, description })
        .then(() => res.json({
        error: false,
        message: "Form submitted successfully!",
    }))
        .catch((e) => res.json({
        error: true,
        message: "Failed due to some technical reason. Please retry!",
    }));
}));
exports.default = router;
