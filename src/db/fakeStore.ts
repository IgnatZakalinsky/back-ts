type IUser = {
    sex?: string;
    findSex?: string[];
    id: number;
    isSearching: boolean;
    chatId?: number;
    date: number;
}
type IMessage = {
    message: string;
    userId: number;
    date: number;
}
type IChat = {
    id: number;
    messages: IMessage[];
    date: number;
    user1Id: number;
    user2Id: number;
    user1Date: number;
    user2Date: number;

}

export const store = {
    users: [] as IUser[],
    chats: [] as IChat[],

    addUser(sex?: string, findSex?: string[]): number {
        const id = Math.random();
        this.users = [...this.users, {id, isSearching: true, date: new Date().getTime(), sex, findSex}];
        return id;
    },

    getChat(userId: number): { status: string, chatId: number | null } {
        const user = this.users.find(u => u.id === userId);
        if (!user) return {status: 'no user with id=' + userId, chatId: null};

        if (user.chatId) {
            this.users = this.users.filter(u => u.id !== userId);

            return {status: 'found', chatId: user.chatId};
        }

        user.date = new Date().getTime();
        const deadTime = new Date().getTime() - (1000 * 60);
        this.users = this.users.filter(u => u.date > deadTime);

        const fSex = (u: IUser): boolean => {
            if (!user.findSex || user.findSex[0] === 'all') {
                if (!u.findSex || u.findSex[0] === 'all') return true;
                return !!(user.sex && u.findSex.find(s => s === user.sex));
            } else {
                return !!(u.sex && user.findSex.find(s => s === u.sex));
            }
        };
        const filteredUsers = this.users.filter(u => u.isSearching && fSex(u));
        const user2 = filteredUsers[Math.floor(Math.random() * filteredUsers.length)];
        if (!user2 || user === user2) return {status: 'wait', chatId: null};

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
                date: new Date().getTime(),
                user1Id: user.id,
                user2Id: user2.id,
                user1Date: new Date().getTime(),
                user2Date: new Date().getTime(),
            }
        ];
        this.users = this.users.filter(u => u.id !== userId);
        console.log('[', user.sex, user.findSex, '|', user2.sex, user2.findSex, ']');
        return {status: 'found', chatId: id};
    },

    messageGet(chatId: number, date: number, userId: number): { messages: IMessage[], status: string } {
        const chat = this.chats.find(c => c.id === chatId);
        if (!chat) return {status: 'no chat with id=' + chatId, messages: []};

        if (userId === chat.user1Id) chat.user1Date = new Date().getTime();
        if (userId === chat.user2Id) chat.user2Date = new Date().getTime();

        const deadTime = new Date().getTime() - (1000 * 60);
        if (chat.user1Date < deadTime || chat.user2Date < deadTime) {
            const find = chat.messages.find(m => m.message === '1qaz2wsx3edc');
            if (!find) {

                chat.messages = [
                    ...chat.messages,
                    {message: '1qaz2wsx3edc', date: new Date().getTime(), userId: 0}
                ];
                return {
                    status: 'off', messages: chat.messages
                        .filter(m => m.date > date)
                };
            }
        }

        const find = chat.messages.find(m => m.message === '1qaz2wsx3edc');
        let status = 'ok';
        if (find) status = 'off';

        return {status, messages: chat.messages.filter(m => m.date > date)};
    },

    messagePost(chatId: number, message: string, userId: number): string {
        const chat = this.chats.find(c => c.id === chatId);
        if (!chat) return 'no chat with id=' + chatId;

        let resultUserId = userId;
        if (message === '1qaz2wsx3edc') resultUserId = 0;

        chat.messages = [...chat.messages, {message, date: new Date().getTime(), userId: resultUserId}];
        return 'ok';
    },
};
