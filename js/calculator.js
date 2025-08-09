document.addEventListener('DOMContentLoaded', function() {
    const calculatorForm = document.querySelector('.calculator-form');
    if (calculatorForm) {
        const fractionSelect = document.getElementById('fraction');
        const volumeInput = document.getElementById('volume');
        const deliverySelect = document.getElementById('delivery');
        const totalPriceElement = document.getElementById('total-price');

        function calculateTotal() {
            const pricePerCube = parseInt(fractionSelect.value);
            const volume = parseInt(volumeInput.value) || 0;
            const deliveryCost = parseInt(deliverySelect.value);
            
            const total = (pricePerCube * volume) + deliveryCost;
            totalPriceElement.textContent = new Intl.NumberFormat('ru-RU', {
                style: 'currency',
                currency: 'RUB',
                maximumFractionDigits: 0
            }).format(total).replace(',', ' ');
        }

        fractionSelect.addEventListener('change', calculateTotal);
        volumeInput.addEventListener('input', calculateTotal);
        deliverySelect.addEventListener('change', calculateTotal);

        // Initial calculation
        calculateTotal();
    }
});