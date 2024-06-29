document.addEventListener('DOMContentLoaded', function () {
    const testButton = document.getElementById('testButton');

    testButton.addEventListener('click', function () {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png', // 아이콘 파일 경로 확인
            title: '약 복용 알림 테스트',
            message: '약 복용 시간입니다!'
        });
    });
});
