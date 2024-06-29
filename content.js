chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "showButtons") {
        const buttonContainer = document.createElement("div");
        buttonContainer.style.position = "fixed";
        buttonContainer.style.bottom = "20px";
        buttonContainer.style.right = "20px";
        buttonContainer.style.zIndex = "9999";

        const yesButton = document.createElement("button");
        yesButton.textContent = "네";
        yesButton.addEventListener("click", () => {
            chrome.tabs.create({ url: "https://129.go.kr/109" });

            chrome.notifications.create({
                type: "basic",
                iconUrl: "icon.png",
                title: "경고",
                message: "자살예방센터 페이지로 이동합니다.",
                silent: false,
            });

            buttonContainer.remove();
        });

        const noButton = document.createElement("button");
        noButton.textContent = "아니요";
        noButton.addEventListener("click", () => {
            buttonContainer.remove();
        });

        buttonContainer.appendChild(yesButton);
        buttonContainer.appendChild(noButton);
        document.body.appendChild(buttonContainer);
    }
});

// 충동 유발 사이트 감지 및 알림
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.url.includes('충동유발사이트주소')) {
        createNotification('충동적인 행동을 하기 전에 다시 한번 생각해 보세요.');
    }
});

function createNotification(message) {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: "알림",
        message: message,
    });
}
