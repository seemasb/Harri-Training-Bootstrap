let storage = {}
export function setInLocalStorage(key, value) { //value is array of fav countries
    try {
        localStorage.setItem(key, JSON.stringify(value));

    } catch (e) {
        console.log(e, "add to storage failed");
        storage[key] = value;
    }
}

export function getFromLocalStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    }
    catch {
        return storage[key];

    }
}