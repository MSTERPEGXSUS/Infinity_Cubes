import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// =======================
// CUBE ORDERS
// =======================

const orderForm =
document.getElementById("orderForm");

if(orderForm){

    orderForm.addEventListener("submit", async (e)=>{

        e.preventDefault();

        await addDoc(
            collection(db,"orders"),
            {

                type:"cube",

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

            }
        );

        alert("Order submitted!");

        orderForm.reset();

    });

}


// =======================
// SPECIAL REQUESTS
// =======================

const specialForm =
document.getElementById("specialForm");

if(specialForm){

    specialForm.addEventListener("submit", async (e)=>{

        e.preventDefault();

        const halfHours =
        Number(
            document.getElementById("printTime").value
        );

        await addDoc(
            collection(db,"orders"),
            {

                type:"special",

                name:
                document.getElementById("specialName").value,

                description:
                document.getElementById("requestText").value,

                printTime:
                halfHours,

                price:
                halfHours * 0.5

            }
        );

        alert("Special request submitted!");

        specialForm.reset();

    });

}


// =======================
// PASSWORD
// =======================

window.checkPassword = async function(){

    const pass =
    document.getElementById("password").value;

    if(pass !== "cubeadmin"){

        alert("Incorrect password");

        return;

    }

    document.getElementById(
        "loginBox"
    ).style.display = "none";

    document.getElementById(
        "ordersArea"
    ).style.display = "block";

    loadOrders();

};


// =======================
// LOAD ORDERS
// =======================

async function loadOrders(){

    const container =
    document.getElementById("ordersList");

    const snapshot =
    await getDocs(
        collection(db,"orders")
    );

    let html = "";

    let revenue = 0;

    snapshot.forEach(doc=>{

        const order = doc.data();

        revenue +=
        Number(order.price || 0);

        if(order.type === "cube"){

            html += `

            <div class="order-card">

                <h2>📦 Cube Order</h2>

                <p><b>Name:</b>
                ${order.name}</p>

                <p><b>Colour:</b>
                ${order.colour}</p>

                <p><b>Quantity:</b>
                ${order.quantity}</p>

                <p><b>Price:</b>
                £${order.price.toFixed(2)}</p>

            </div>

            `;

        }

        else{

            html += `

            <div class="order-card">

                <h2>🛠 Special Request</h2>

                <p><b>Name:</b>
                ${order.name}</p>

                <p><b>Request:</b>
                ${order.description}</p>

                <p><b>Print Time:</b>
                ${order.printTime}
                half-hours</p>

                <p><b>Price:</b>
                £${order.price.toFixed(2)}</p>

            </div>

            `;

        }

    });

    html += `

    <div class="cart-total">

        Total Revenue

        <br><br>

        £${revenue.toFixed(2)}

    </div>

    `;

    container.innerHTML = html;

}
