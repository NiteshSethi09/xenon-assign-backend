"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const product_1 = __importDefault(require("./routes/product"));
const user_1 = __importDefault(require("./routes/user"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use("/product", product_1.default);
app.use("/user", user_1.default);
app.get("/", (req, res) => {
    res.json({ error: false, messgae: "Hello world" });
});
mongoose_1.default
    .connect("mongodb+srv://nitesh:nitesh00@project.xeny0.mongodb.net/xenon")
    .then(() => app.listen(5000, () => console.log("Server is running.")))
    .catch((e) => console.log("DB connection error:", e.message));
