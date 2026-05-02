document.addEventListener("DOMContentLoaded", function() {
    const quantities = document.querySelectorAll(".quantity");
    const itemTotals = document.querySelectorAll(".item-total");
    const cartTotal = document.getElementById("cart-total");
    const removeButtons = document.querySelectorAll(".remove-btn");

    function updateTotal() {
        let total = 0;
        quantities.forEach((qty, index) => {
            let price = parseFloat(itemTotals[index].previousElementSibling.textContent.replace("$", ""));
            let newTotal = price * qty.value;
            itemTotals[index].textContent = `$${newTotal.toFixed(2)}`;
            total += newTotal;
        });
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    quantities.forEach(qty => {
        qty.addEventListener("input", updateTotal);
    });

    removeButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            button.parentElement.remove();
            updateTotal();
        });
    });

    updateTotal();
});
