document.addEventListener('DOMContentLoaded', function () {
    const addRowButton = document.getElementById('add-row');
    const billingRows = document.getElementById('billing-rows');
    const rowTemplate = document.getElementById('row-template');
    const totalDisplay = document.getElementById('billing-total');

    if (!addRowButton || !billingRows) return;

    function updateTotals() {
        let total = 0;
        const rows = billingRows.querySelectorAll('.billing-row:not(.header-row)');
        rows.forEach(row => {
            const select = row.querySelector('select');
            const qtyInput = row.querySelector('.qty-input');
            const priceCell = row.querySelector('.price-cell');
            const subtotalCell = row.querySelector('.subtotal-cell');
            const priceValue = parseFloat(select.selectedOptions[0]?.dataset.price || 0);
            const quantity = parseInt(qtyInput.value, 10) || 0;
            const subtotal = priceValue * quantity;
            priceCell.textContent = `Rs. ${priceValue.toFixed(2)}`;
            subtotalCell.textContent = `Rs. ${subtotal.toFixed(2)}`;
            total += subtotal;
        });
        totalDisplay.textContent = `Rs. ${total.toFixed(2)}`;
    }

    function addRow() {
        const clone = rowTemplate.content.firstElementChild.cloneNode(true);
        const removeButton = clone.querySelector('.remove-row');
        const select = clone.querySelector('select');
        const qtyInput = clone.querySelector('.qty-input');

        removeButton.addEventListener('click', function () {
            clone.remove();
            updateTotals();
        });

        select.addEventListener('change', updateTotals);
        qtyInput.addEventListener('input', updateTotals);
        billingRows.appendChild(clone);
        updateTotals();
    }

    addRowButton.addEventListener('click', addRow);
    billingRows.addEventListener('input', updateTotals);
    addRow();
});
