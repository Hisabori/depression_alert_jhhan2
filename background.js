chrome.runtime.onInstalled.addListener(() => {
    // 알람 설정 (UTC 시간 기준)
    chrome.alarms.create("morningMeds", { when: calculateAlarmTime(9) });
    chrome.alarms.create("afternoonMeds", { when: calculateAlarmTime(14) });
    chrome.alarms.create("eveningMeds", { when: calculateAlarmTime(22) });
    chrome.alarms.create("impulseCheckAlarm", { periodInMinutes: 60 }); // 1시간마다 충동 확인 알림
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "impulseCheckAlarm") {
        createNotification("지금 잠시 멈추고 자신의 감정을 확인해 보세요.");
    } else {
        const messages = {
            morningMeds: "💼💊아침 (9시)\n콘서타\n아빌리파이\n인데놀\n프로작",
            afternoonMeds: "🏥💊점심 (14시)\n프로작",
            eveningMeds: "🛏️💊저녁약 알림 (22시)\n아티반\n쎄로켈\n데파코트\n아빌리파이"
        };

        chrome.notifications.create({
            type: "basic",
            iconUrl: "icon.png",
            title: "약 복용 알림",
            message: messages[alarm.name] || "약 복용 시간입니다."
        });
    }
});

chrome.notifications.onClicked.addListener((notificationId) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab) {
            chrome.tabs.sendMessage(currentTab.id, { action: "showButtons" });
        }
    });
});

function calculateAlarmTime(targetHour) {
    // ... (이전과 동일)
}

function createNotification(message) {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: "알림",
        message: message,
    });
}
