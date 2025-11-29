document.addEventListener("DOMContentLoaded", () => {
    const quantity = document.getElementById("quantity");
    const typeRadios = document.querySelectorAll("input[name='type']");
    const optionsBlock = document.getElementById("options-block");
    const optionsSelect = document.getElementById("options");
    const propertyBlock = document.getElementById("property-block");
    const property = document.getElementById("property");
    const result = document.getElementById("result");

    function calculate() {
        let qty = quantity.value.trim();

        // Проверка количества
        if (!/^[1-9][0-9]*$/.test(qty)) {
            result.textContent = "Ошибка: введите корректное количество!";
            result.style.color = "red";
            return;
        }

        qty = parseInt(qty, 10);
        let type = [...typeRadios].find(r => r.checked).value;
        let price = 0;

        switch (type) {
            case "1": // тип 1 — фиксированная цена
                price = 500;
                break;

            case "2": // тип 2 — выпадающее меню
                price = parseInt(optionsSelect.value);
                break;

            case "3": // тип 3 — чекбокс
                price = 700;
                if (property.checked) price += 300;
                break;
        }

        let total = qty * price;
        result.style.color = "black";
        result.textContent = Стоимость: ${ total } ₽;
    }

    // Переключение типов
    typeRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            const val = radio.value;

            optionsBlock.classList.toggle("d-none", val !== "2");
            propertyBlock.classList.toggle("d-none", val !== "3");

            calculate();
        });
    });

    // Ввод данных
    quantity.addEventListener("input", calculate);
    optionsSelect.addEventListener("change", calculate);
    property.addEventListener("change", calculate);
});