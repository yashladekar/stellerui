"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const sample_lib_1 = require("@stellerui/sample-lib");
function Home() {
    const result = (0, sample_lib_1.add)(1, 2);
    return <div>hello world by frontend {result}</div>;
}
