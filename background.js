chrome.runtime.onInstalled.addListener(() => {
    // 알람 설정 (UTC 시간 기준)
    chrome.alarms.create("morningMeds", { when: calculateAlarmTime(9) });
    chrome.alarms.create("afternoonMeds", { when: calculateAlarmTime(14) });
    chrome.alarms.create("eveningMeds", { when: calculateAlarmTime(22) });
});

chrome.alarms.onAlarm.addListener((alarm) => {
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
    const now = new Date();
    const targetTime = new Date(now);
    targetTime.setHours(targetHour, 0, 0, 0);

    if (targetTime < now) {
        targetTime.setDate(targetTime.getDate() + 1);
    }

    const utcTime = targetTime.getTime() - (9 * 60 * 60 * 1000);

    return utcTime;
}
