document.addEventListener('DOMContentLoaded', function () {
    const calculatorForm = document.getElementById('transport-calculator');
    const resultBlock = document.getElementById('calculation-result');
    const priceElement = document.getElementById('price');
    const timeElement = document.getElementById('time');

    if (calculatorForm) {
        calculatorForm.addEventListener('input', calculateTransportCost);

        function calculateTransportCost() {
            const distance = parseFloat(document.getElementById('distance').value) || 0;
            const weight = parseFloat(document.getElementById('weight').value) || 0;
            const volume = parseFloat(document.getElementById('volume').value) || 0;
            const vehicleType = document.getElementById('vehicle-type').value;
            const urgency = document.getElementById('urgency').value;

            // Базовая цена за км
            let pricePerKm = 30;

            // Коэффициенты по типу транспорта
            switch (vehicleType) {
                case 'medium': pricePerKm = 50; break;
                case 'large': pricePerKm = 80; break;
                case 'refrigerator': pricePerKm = 100; break;
                case 'tanker': pricePerKm = 120; break;
            }

            // Наценка за срочность
            switch (urgency) {
                case 'express': pricePerKm *= 1.5; break;
                case 'urgent': pricePerKm *= 2; break;
            }

            // Расчет стоимости
            let totalPrice = distance * pricePerKm;

            // Минимальная стоимость
            if (totalPrice < 1000 && distance > 0) {
                totalPrice = 1000;
            }

            // Примерное время доставки (часов)
            let timeHours = Math.max(1, Math.floor(distance / 60));
            if (urgency === 'express') timeHours = Math.max(1, Math.floor(distance / 80));
            if (urgency === 'urgent') timeHours = Math.max(1, Math.floor(distance / 100));

            // Вывод результата
            priceElement.textContent = new Intl.NumberFormat('ru-RU', {
                style: 'currency',
                currency: 'RUB',
                maximumFractionDigits: 0
            }).format(totalPrice);

            timeElement.textContent = timeHours + ' ' + getHoursText(timeHours);
            resultBlock.classList.remove('hidden');
        }

        function getHoursText(hours) {
            if (hours % 10 === 1 && hours % 100 !== 11) return 'час';
            if ([2, 3, 4].includes(hours % 10) && ![12, 13, 14].includes(hours % 100)) return 'часа';
            return 'часов';
        }

        // Первичный расчет при загрузке
        calculateTransportCost();
    }
});
