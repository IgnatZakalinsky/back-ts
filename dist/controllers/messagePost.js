"use strict";
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
const fakeStore_1 = require("../db/fakeStore");
exports.messagePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = fakeStore_1.store.messagePost(+req.body.chatId, req.body.message, +req.body.userId);
    res.status(200).json({ status });
});
//# sourceMappingURL=messagePost.js.map