document.addEventListener("DOMContentLoaded", () => {

    const form =
    document.getElementById("orderForm");

    if(form){

        form.addEventListener("submit", (e) => {

            e.preventDefault();

            const order = {

                name:
                document.getElementById("name").value,
                colour: document.getElementById("colour").value,
                quantity:
                document.getElementById("quantity").value

            };

            let orders =
            JSON.parse(
                localStorage.getItem("orders")
            ) || [];

            orders.push(order);

            localStorage.setItem(
                "orders",
                JSON.stringify(orders)
            );

            alert("Order Saved");

            form.reset();

        });

    }

});

function resetOrders(){

    if(confirm("Delete all orders?")){

        localStorage.removeItem("orders");

        location.reload();

    }

}

function displayOrders(){
    container.innerHTML += `
<div class="order-card">
    <h2>${order.name}</h2>
    <p>Quantity: ${order.quantity}</p>
</div>
`;
    container.innerHTML += `
<div class="order-card">

    <h2>${order.name}</h2>

    <p>
        <strong>Colour:</strong>
        ${order.colour}
    </p>

    <p>
        <strong>Quantity:</strong>
        ${order.quantity}
    </p>

</div>
`;
    const container =
    document.getElementById("ordersList");

    if(!container) return;

    const orders =
    JSON.parse(
        localStorage.getItem("orders")
    ) || [];

    if(orders.length === 0){

        container.innerHTML =
        "<h2>No Orders Yet</h2>";

        return;

    }

    container.innerHTML = "";

    orders.forEach(order => {

        container.innerHTML += `

        <div class="order-card">

            <h2>${order.name}</h2>

            <p>
                Quantity:
                ${order.quantity}
            </p>

        </div>

        `;

    });

}
