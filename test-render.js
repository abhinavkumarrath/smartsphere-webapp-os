"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const server_1 = require("react-dom/server");
const App_1 = __importDefault(require("./src/App"));
try {
    const html = (0, server_1.renderToString)(react_1.default.createElement(App_1.default));
    console.log('Render successful! Length:', html.length);
}
catch (e) {
    console.error('Render failed!');
    console.error(e);
}
