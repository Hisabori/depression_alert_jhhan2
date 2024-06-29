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
                silent: false
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
