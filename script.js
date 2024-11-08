// script.js
let draggingSlider = null; // ���� �巡�� ���� �����̴�
let offsetY = 0;           // �巡�� ���� �� Y ��ġ ����

// �����̴��� ��� �ִ� ��ҵ�
const sliders = document.querySelectorAll('.slider');

// �����̴� �׷캰 ���� ����
const sliderGroups = {
    group1: { minY: 80, maxY: window.innerHeight / 2 - 50 },  // �׷� 1�� Y ��ġ ����
    group2: { minY: window.innerHeight / 2 + 50, maxY: window.innerHeight - 150 }  // �׷� 2�� Y ��ġ ����
};

// �����̴� �巡�� ����
sliders.forEach(slider => {
    slider.addEventListener('mousedown', (event) => {
        draggingSlider = slider;  // �巡�� ����
        offsetY = event.clientY - slider.getBoundingClientRect().top;

        // ���콺 �̵� �̺�Ʈ ó��
        const onMouseMove = (moveEvent) => {
            if (draggingSlider) {
                let newY = moveEvent.clientY - offsetY;

                // �巡�׵� �����̴��� �׷쿡 �´� Y ��ǥ ������ ����
                const group = draggingSlider.classList.contains('group1') ? 'group1' : 'group2';
                const minY = sliderGroups[group].minY;
                const maxY = sliderGroups[group].maxY;

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
