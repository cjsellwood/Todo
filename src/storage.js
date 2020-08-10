const storage = (() => {
    // Store projects in local storage
    function addToStorage(array, item) {
        window.localStorage.setItem(item, JSON.stringify(array));
    }
    
    // Retrieve projects from local storage
    function getFromStorage(item) {
        let returnArray = JSON.parse(window.localStorage.getItem(item));

        // Create blank list if doesn't exist yet 
        if (returnArray === null) {
            returnArray = [];
        }
        return returnArray;
    }

    return {
        addToStorage,
        getFromStorage
    }
})();

export { storage }