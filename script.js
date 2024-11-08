// script.js
let draggingSlider = null; // 현재 드래그 중인 슬라이더
let offsetY = 0;           // 드래그 시작 시 Y 위치 차이

// 슬라이더를 담고 있는 요소들
const sliders = document.querySelectorAll('.slider');

// 슬라이더 그룹별 제한 설정
const sliderGroups = {
    group1: { minY: 80, maxY: window.innerHeight / 2 - 50 },  // 그룹 1의 Y 위치 제한
    group2: { minY: window.innerHeight / 2 + 50, maxY: window.innerHeight - 150 }  // 그룹 2의 Y 위치 제한
};

// 슬라이더 드래그 시작
sliders.forEach(slider => {
    slider.addEventListener('mousedown', (event) => {
        draggingSlider = slider;  // 드래그 시작
        offsetY = event.clientY - slider.getBoundingClientRect().top;

        // 마우스 이동 이벤트 처리
        const onMouseMove = (moveEvent) => {
            if (draggingSlider) {
                let newY = moveEvent.clientY - offsetY;

                // 드래그된 슬라이더의 그룹에 맞는 Y 좌표 제한을 적용
                const group = draggingSlider.classList.contains('group1') ? 'group1' : 'group2';
                const minY = sliderGroups[group].minY;
                const maxY = sliderGroups[group].maxY;

                // Y 좌표가 범위를 벗어나지 않도록 제한
                if (newY < minY) newY = minY;
                if (newY > maxY) newY = maxY;

                draggingSlider.style.top = `${newY}px`;  // 슬라이더 이동
            }
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);  // 마우스 이동 이벤트 종료
            document.removeEventListener('mouseup', onMouseUp);  // 마우스 버튼 떼면 드래그 종료
            draggingSlider = null;
        };

        // 마우스 이동 및 버튼 떼기 이벤트 리스너 등록
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
});
