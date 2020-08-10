const storage = (() => {
    // Store projects in local storage
    function addToStorage(array, item) {
        window.localStorage.setItem(item, JSON.stringify(array));
    }
    
    // Retrieve projects from local storage
    function getFromStorage(item) {
        return JSON.parse(window.localStorage.getItem(item));
    }

    return {
        addToStorage,
        getFromStorage
    }
})();

export { storage }