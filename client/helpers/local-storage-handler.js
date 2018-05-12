class LocalStorageHandler {
    constructor() {
        this.prefix = 'belsk-insurance--';
        this.ls = window.localStorage;
    }

    prefixify(key) {
        return `${this.prefix}${key}`;
    }

    set(key, value) {
        this.ls.setItem(this.prefixify(key), JSON.stringify(value));
    }

    get(key) {
        return JSON.parse(this.ls.getItem(this.prefixify(key)));
    }

    remove(key) {
        this.ls.removeItem(this.prefixify(key));
    }
}

const localStorageHandler = new LocalStorageHandler();

export default localStorageHandler;
