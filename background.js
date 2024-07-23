chrome.runtime.onInstalled.addListener(() => {
    console.log("확장 프로그램 설치 완료");

    chrome.alarms.create('morningMeds', { when: calculateAlarmTime(9) });
    chrome.alarms.create('afternoonMeds', { when: calculateAlarmTime(14) });
    chrome.alarms.create('eveningMeds', { when: calculateAlarmTime(22) });
    chrome.alarms.create('impulseCheckAlarm', { periodInMinutes: 60 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'impulseCheckAlarm') {
        createNotification("지금 잠시 멈추고 자신의 감정을 확인해 보세요.");
    } else {
        const messages = {
            morningMeds: "💼💊아침 (9시)\n콘서타\n아빌리파이\n인데놀\n프로작",
            afternoonMeds: "🏥💊점심 (14시)\n프로작",
            eveningMeds: "🛏️💊저녁약 알림 (22시)\n아티반\n쎄로켈\n데파코트\n아빌리파이"
        };

        createNotification(messages[alarm.name] || "약 복용 시간입니다.");
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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "checkForKeywords") {
        for (const keyword of forbiddenKeywords) {
            if (message.text.includes(keyword)) {
                chrome.notifications.create({
                    type: "basic",
                    iconUrl: "icon.png",
                    title: "경고",
                    message: "경고: 위험한 키워드가 발견되었습니다!"
                });
                break;
            }
        }
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('충동유발사이트주소')) {
        createNotification('충동적인 행동을 하기 전에 다시 한번 생각해 보세요.');
    }
});

function calculateAlarmTime(targetHour) {
    const now = new Date();
    const targetTime = new Date(now);
    targetTime.setHours(targetHour, 0, 0, 0);

    if (targetTime < now) {
        targetTime.setDate(targetTime.getDate() + 1);
    }

    return targetTime.getTime();
}


function createNotification(message) {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: "알림",
        message: message,
    });
}

const forbiddenKeywords = ["자살", "극단적선택", "죽음", "suicide", "투신"];
    