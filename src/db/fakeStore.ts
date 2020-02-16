type IUser = {
    id: number;
    isSearching: boolean;
    chatId?: number;
}

export const store = {
    users: [] as IUser[],

    addUser() {
        const id = Math.random();
        this.users = [...this.users, {id, isSearching: true}];
        return id;
    }

};