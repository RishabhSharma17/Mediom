"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatebloginput = exports.BlogInput = exports.signupformat = void 0;
const zod_1 = require("zod");
exports.signupformat = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    username: zod_1.z.string().min(3).max(20).optional(),
    name: zod_1.z.string().optional(),
});
exports.BlogInput = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.updatebloginput = zod_1.z.object({
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
    userId: zod_1.z.string(),
});
