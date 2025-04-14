(function exploreLocalStorage() {
    // Check if localStorage is supported
    if (!window.localStorage) {
        console.log("LocalStorage is not supported.");
        return;
    }

    // Log localStorage data
    const storageData = {};
    console.log("Exploring localStorage contents...");
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        storageData[key] = value;
        console.log(`Key: ${key}, Value: ${value}`);
    }

    // Test storing new data into localStorage
    const testKey = "test_key_" + Date.now();
    const testValue = "Test Value at " + new Date().toISOString();
    localStorage.setItem(testKey, testValue);
    console.log(`Stored test data: ${testKey} = ${testValue}`);

    // Test modifying an existing value
    if (localStorage.length > 0) {
        const firstKey = localStorage.key(0);
        const oldValue = localStorage.getItem(firstKey);
        const newValue = oldValue + " | Modified at " + new Date().toISOString();
        localStorage.setItem(firstKey, newValue);
        console.log(`Modified key "${firstKey}": New value = ${newValue}`);
    }

    // Test removing a specific key
    if (localStorage.length > 0) {
        const keyToRemove = localStorage.key(0);
        localStorage.removeItem(keyToRemove);
        console.log(`Removed key: ${keyToRemove}`);
    }

    // Display results on the webpage
    const resultsDiv = document.createElement("div");
    resultsDiv.style = "background: #333; color: #fff; padding: 10px; font-family: Arial; font-size: 14px; margin: 10px;";
    resultsDiv.innerHTML = `
        <h3>LocalStorage Exploration Results</h3>
        <p><strong>Current LocalStorage Contents:</strong></p>
        <pre>${JSON.stringify(storageData, null, 2)}</pre>
        <p><strong>Test Key Added:</strong> ${testKey} = ${testValue}</p>
    `;
    document.body.appendChild(resultsDiv);
})();