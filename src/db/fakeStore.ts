type IUser = {
    id: number;
    isSearching: boolean;
    chatId?: number;
}
type IMessage = {
    message: string;
    userId: number;
    date: string;
}
type IChat = {
    id: number;
    messages: IMessage[];
    date: string;
}

export const store = {
    users: [] as IUser[],
    chats: [] as IChat[],

    addUser(): number {
        const id = Math.random();
        this.users = [...this.users, {id, isSearching: true}];
        return id;
    },

    getChat(userId: number): {status: string, chatId: number | null} {
        const user = this.users.find(u => u.id === userId);
        if (!user) return {status: 'no user with id=' + userId, chatId: null};

        if (user.chatId) {
            this.users = this.users.filter(u => u.id !== userId);

            return {status: 'found', chatId: user.chatId};
        }

        const filteredUsers = this.users.filter(u => u.isSearching);
        const user2 = filteredUsers[Math.floor(Math.random() * filteredUsers.length)];
        if (user === user2) return {status: 'wait', chatId: null};

        user.isSearching = false;
        user2.isSearching = false;
        const id = Math.random();
        user2.chatId = id;
        user.chatId = id;
        this.chats = [...this.chats, {id, messages: [], date: new Date().toString()}];
        return {status: 'found', chatId: id}
    },



};