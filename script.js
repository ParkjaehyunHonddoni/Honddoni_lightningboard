// JavaScript source code
// script.js
let draggingSlider = null;  // ���� �巡�� ���� �����̴�
let offsetY = 0;            // �巡�� ���� �� Y ��ġ ����

// �����̴��� ��� �ִ� ��ҵ�
const sliders = document.querySelectorAll('.slider');

// �����̴� �巡�� ����
sliders.forEach(slider => {
    slider.addEventListener('mousedown', (event) => {
        draggingSlider = slider;  // �巡�� ����
        offsetY = event.clientY - slider.getBoundingClientRect().top;

        // ���콺 �̵� �̺�Ʈ ó��
        const onMouseMove = (moveEvent) => {
            if (draggingSlider) {
                let newY = moveEvent.clientY - offsetY;
                const minY = 80;  // �ּ� Y ��ǥ
                const maxY = window.innerHeight - 180;  // �ִ� Y ��ǥ

                // Y ��ǥ�� ������ ����� �ʵ��� ����
                if (newY < minY) newY = minY;
                if (newY > maxY) newY = maxY;

                draggingSlider.style.top = `${newY}px`;  // �����̴� �̵�
            }
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);  // ���콺 �̵� �̺�Ʈ ����
            document.removeEventListener('mouseup', onMouseUp);  // ���콺 ��ư ���� �巡�� ����
            draggingSlider = null;
        };

        // ���콺 �̵� �� ��ư ���� �̺�Ʈ ������ ���
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
});
