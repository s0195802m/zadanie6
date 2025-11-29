document.addEventListener("DOMContentLoaded", () => {
    const quantityInput = document.getElementById("quantity");
    const serviceRadios = document.querySelectorAll('input[name="service"]');
    const optionSelect = document.getElementById("optionSelect");
    const propertyCheck = document.getElementById("propertyCheck");
    const optionsBox = document.getElementById("optionsBox");
    const propertyBox = document.getElementById("propertyBox");
    const result = document.getElementById("result");

    const basePrices = {
        type1: 1000,
        type2: 1500,
        type3: 2000,
    };

    function updateVisibility() {
        const selectedType = document.querySelector('input[name="service"]:checked').value;
        if (selectedType === "type1") {
            optionsBox.classList.add("hidden");
            propertyBox.classList.add("hidden");
        } else if (selectedType === "type2") {
            optionsBox.classList.remove("hidden");
            propertyBox.classList.add("hidden");
        } else if (selectedType === "type3") {
            optionsBox.classList.add("hidden");
            propertyBox.classList.remove("hidden");
        }
    }

    function calculateTotal() {
        const type = document.querySelector('input[name="service"]:checked').value;
        const quantity = parseInt(quantityInput.value) || 0;
        let total = basePrices[type] * quantity;

        if (type === "type2") {
            total += parseInt(optionSelect.value) * quantity;
        }
        if (type === "type3" && propertyCheck.checked) {
            total += parseInt(propertyCheck.value) * quantity;
        }

        result.textContent = `Стоимость: ${total.toLocaleString()}₽`;
    }

    serviceRadios.forEach(radio => radio.addEventListener("change", () => {
        updateVisibility();
        calculateTotal();
    }));

    [quantityInput, optionSelect, propertyCheck].forEach(el =>
        el.addEventListener("input", calculateTotal)
    );

    updateVisibility();
    calculateTotal();
});
