// ======================
// SAVE ORDER
// ======================

document.addEventListener("DOMContentLoaded", () => {

    const orderForm = document.getElementById("orderForm");

    if(orderForm){

        orderForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const order = {

                name: document.getElementById("name").value,

                colour: document.getElementById("colour").value,

                quantity: Number(
                    document.getElementById("quantity").value
                ),

                price: Number(
                    document.getElementById("quantity").value
                ) * 1

            };

            let orders =
            JSON.parse(localStorage.getItem("orders")) || [];

            orders.push(order);

            localStorage.setItem(
                "orders",
                JSON.stringify(orders)
            );

            alert("Order Saved!");

            orderForm.reset();

        });

    }

});

// ======================
// PASSWORD CHECK
// ======================

function checkPassword(){

    const password =
    document.getElementById("password").value;

    if(password === "cubeadmin"){

        document.getElementById("loginBox").style.display =
        "none";

        document.getElementById("ordersArea").style.display =
        "block";

        displayOrders();

    }

    else{

        alert("Incorrect Password");

    }

}

// ======================
// DISPLAY ORDERS
// ======================

function displayOrders(){

    const container =
    document.getElementById("ordersList");

    if(!container) return;

    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];

    container.innerHTML = "";

    let total = 0;

    if(orders.length === 0){

        container.innerHTML =
        "<h2>No Orders Yet</h2>";

        return;

    }

    orders.forEach(order => {

        total += order.price;

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

            <p>
                <strong>Price:</strong>
                £${order.price.toFixed(2)}
            </p>

        </div>

        `;

    });

    container.innerHTML += `

    <div class="cart-total">

        Total Revenue:
        £${total.toFixed(2)}

        <br><br>

        <button onclick="clearOrders()">
            Clear All Orders
        </button>

    </div>

    `;

}

// ======================
// CLEAR ORDERS
// ======================

function clearOrders(){

    if(confirm("Delete all orders?")){

        localStorage.removeItem("orders");

        location.reload();

    }

}
