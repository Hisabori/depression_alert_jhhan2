document.addEventListener('DOMContentLoaded', function () {
    const morningButton = document.getElementById('morningButton');
    const lunchButton = document.getElementById('lunchButton');
    const eveningButton = document.getElementById('eveningButton');

    morningButton.addEventListener('click', function () {
        createNotification('아침 약 복용 시간입니다!');
    });

    lunchButton.addEventListener('click', function () {
        createNotification('점심 약 복용 시간입니다!');
    });

    eveningButton.addEventListener('click', function () {
        createNotification('저녁 약 복용 시간입니다!');
    });
});

function createNotification(message) {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: '약 복용 알림',
        message: message
    });
}
