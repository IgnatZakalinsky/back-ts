"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = {
    users: [],
    chats: [],
    addUser() {
        const id = Math.random();
        this.users = [...this.users, { id, isSearching: true, date: new Date().toString() }];
        return id;
    },
    getChat(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user)
            return { status: 'no user with id=' + userId, chatId: null };
        if (user.chatId) {
            this.users = this.users.filter(u => u.id !== userId);
            return { status: 'found', chatId: user.chatId };
        }
        user.date = new Date().toString();
        const deadTime = new Date(new Date().getTime() - (1000 * 10)).toString();
        this.users = this.users.filter(u => u.date > deadTime);
        const filteredUsers = this.users.filter(u => u.isSearching);
        const user2 = filteredUsers[Math.floor(Math.random() * filteredUsers.length)];
        if (user === user2)
            return { status: 'wait', chatId: null };
        user.isSearching = false;
        user2.isSearching = false;
        const id = Math.random();
        user2.chatId = id;
        user.chatId = id;
        this.chats = [
            ...this.chats,
            {
                id,
                messages: [],
                date: new Date().toString(),
                user1Id: user.id,
                user2Id: user2.id,
                user1Date: new Date().toString(),
                user2Date: new Date().toString(),
            }
        ];
        this.users = this.users.filter(u => u.id !== userId);
        return { status: 'found', chatId: id };
    },
    messageGet(chatId, date, userId) {
        const chat = this.chats.find(c => c.id === chatId);
        if (!chat)
            return { status: 'no chat with id=' + chatId, messages: [] };
        if (userId === chat.user1Id)
            chat.user1Date = new Date().toString();
        if (userId === chat.user2Id)
            chat.user2Date = new Date().toString();
        const deadTime = new Date(new Date().getTime() - (1000 * 10)).toString();
        if (chat.user1Date < deadTime || chat.user2Date < deadTime)
            chat.messages = [...chat.messages, { message: '1qaz2wsx3edc', date: new Date().toString(), userId: 0 }];
        return { status: 'ok', messages: chat.messages.filter(m => m.date > new Date(date).toString()) };
    },
    messagePost(chatId, message, userId) {
        const chat = this.chats.find(c => c.id === chatId);
        if (!chat)
            return 'no chat with id=' + chatId;
        chat.messages = [...chat.messages, { message, date: new Date().toString(), userId }];
        return 'ok';
    },
};
//# sourceMappingURL=fakeStore.js.map