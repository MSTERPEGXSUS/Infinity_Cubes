// ======================
// ORDER FORM
// ======================

document.addEventListener("DOMContentLoaded", () => {

    const form =
    document.getElementById("orderForm");

    if(form){

        form.addEventListener("submit", (e) => {

            e.preventDefault();

            const order = {

                name:
                document.getElementById("name").value,

                colour:
                document.getElementById("colour").value,

                quantity:
                Number(
                    document.getElementById("quantity").value
                ),

                price:
                Number(
                    document.getElementById("quantity").value
                )

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

            alert("Order placed successfully!");

            form.reset();

        });

    }

});

// ======================
// LOGIN
// ======================

function checkPassword(){

    const pass =
    document.getElementById("password").value;

    if(pass === "cubeadmin"){

        document.getElementById(
            "loginBox"
        ).style.display = "none";

        document.getElementById(
            "ordersArea"
        ).style.display = "block";

        showOrders();

    }

    else{

        alert("Incorrect password");

    }

}

// ======================
// SHOW ORDERS
// ======================

function showOrders(){

    const box =
    document.getElementById("ordersList");

    let orders =
    JSON.parse(
        localStorage.getItem("orders")
    ) || [];

    box.innerHTML = "";

    if(orders.length === 0){

        box.innerHTML = `
            <div class="order-card">
                <h2>No Orders Yet</h2>
            </div>
        `;

        return;

    }

    let totalRevenue = 0;

    orders.forEach(order => {

        const price = Number(order.price);

        totalRevenue += price;

        box.innerHTML += `

        <div class="order-card">

            <div class="order-header">

                <h2>${order.name}</h2>

                <span class="status">
                    New Order
                </span>

            </div>

            <p>
                🎨 Colour:
                ${order.colour}
            </p>

            <p>
                📦 Quantity:
                ${order.quantity}
            </p>

            <p>
                💷 Price:
                £${price.toFixed(2)}
            </p>

        </div>

        `;

    });

    box.innerHTML += `

    <div class="cart-total">

        Total Revenue

        <br><br>

        £${totalRevenue.toFixed(2)}

        <br><br>

        <button onclick="clearOrders()">
            Clear Orders
        </button>

    </div>

    `;

}

// ======================
// CLEAR ORDERS
// ======================

function clearOrders(){

    if(confirm(
        "Delete all orders?"
    )){

        localStorage.removeItem(
            "orders"
        );

        showOrders();

    }

}
