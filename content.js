document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('inputField');
    if (inputField) {
        inputField.addEventListener('input', () => {
            chrome.runtime.sendMessage({
                action: "checkForKeywords",
                text: inputField.value
            });
        });
    }
});
