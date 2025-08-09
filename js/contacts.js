document.addEventListener('DOMContentLoaded', function() {
    // Инициализация карты
    const mapElement = document.getElementById('map');
    if (mapElement) {
        // Координаты для Ириновского пр-кт, д. 2 в СПб
        const map = L.map('map').setView([59.953622, 30.449671], 17);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Добавляем маркер с правильным адресом
        L.marker([59.953622, 30.449671]).addTo(map)
            .bindPopup(`
                <b>ООО "Мир"</b><br>
                г. Санкт-Петербург,<br>
                пр-кт Ириновский, д. 2, лит. А,<br>
                пом. 1Н, офис 205/Б
            `)
            .openPopup();
    }
    
    // Обработка формы обратной связи
    const contactForm = document.querySelector('.contacts-form .form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь можно добавить отправку формы на сервер
            // Для демонстрации просто покажем сообщение
            alert('Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
            
            // Очищаем форму
            this.reset();
        });
    }
    
    // Инициализация табов для филиалов
    const departmentTabs = document.querySelectorAll('.department-tab');
    const departmentContents = document.querySelectorAll('.department-content');
    
    if (departmentTabs.length > 0) {
        departmentTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                
                // Удаляем активный класс у всех табов и контента
                departmentTabs.forEach(t => t.classList.remove('active'));
                departmentContents.forEach(c => c.classList.remove('active'));
                
                // Добавляем активный класс текущему табу и соответствующему контенту
                this.classList.add('active');
                document.getElementById(targetId).classList.add('active');
            });
        });
    }
});