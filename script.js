console.log("SCRIPT LOADED");

document.addEventListener("DOMContentLoaded", function(){

    const form =
    document.getElementById("orderForm");

    if(form){

        form.addEventListener("submit", function(e){

            e.preventDefault();

        

            const order = {

                name:
                document.getElementById("name").value,

                colour:
                document.getElementById("colour").value,

                quantity:
                document.getElementById("quantity").value

            };

            let orders =
            JSON.parse(localStorage.getItem("orders")) || [];

            orders.push(order);

            localStorage.setItem(
                "orders",
                JSON.stringify(orders)
            );

            alert("Order placed successfully!");

        });

    }

});

function checkPassword(){

    const pass =
    document.getElementById("password").value;

    if(pass === "cubeadmin"){

        document.getElementById("loginBox").style.display =
        "none";

        document.getElementById("ordersArea").style.display =
        "block";

        showOrders();

    }

    else{

        alert("Wrong Password");

    }

}

function showOrders(){

    const box =
    document.getElementById("ordersList");

    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];

    box.innerHTML = "";

    orders.forEach(order => {

        box.innerHTML += `
            <p>
            ${order.name}
            |
            ${order.colour}
            |
            ${order.quantity}
            </p>
        `;

    });

}
