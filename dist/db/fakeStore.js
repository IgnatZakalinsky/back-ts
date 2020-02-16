"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = {
    users: [],
    addUser() {
        const id = Math.random();
        this.users = [...this.users, { id, isSearching: true }];
        return id;
    }
};
//# sourceMappingURL=fakeStore.js.map