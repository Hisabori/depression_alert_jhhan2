document.addEventListener('DOMContentLoaded', function () {
    const morningButton = document.getElementById('morningButton');
    const lunchButton = document.getElementById('lunchButton');
    const eveningButton = document.getElementById('eveningButton');

    morningButton.addEventListener('click', function () {
        createNotification('아침약 복용 시간입니다!');
    });

    lunchButton.addEventListener('click', function () {
        createNotification('점심약 복용 시간입니다!');
    });

    eveningButton.addEventListener('click', function () {
        createNotification('저녁약 복용 시간입니다!');
    });

    function createNotification(message) {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png',
            title: '약 복용 알림',
            message: message
        });
    }

    // ... (기존 코드)

    impulseCheckButton.addEventListener('click', function () {
        // 충동 확인 로직 실행
        const isImpulseControlled = checkImpulse(); // 사용자 입력 또는 기타 방법으로 충동 확인
        if (isImpulseControlled) {
            createNotification('충동을 잘 조절하셨습니다!');
        } else {
            createNotification('충동 조절에 어려움을 겪고 계신가요? 전문가와 상담해 보세요.');
        }
    });

    function checkImpulse() {
        // TODO: 사용자 입력 받거나, 다른 방법으로 충동 확인 로직 구현
        // 예: 간단한 질문 팝업, 슬라이더 입력, 브라우징 기록 분석 등
    }

});
