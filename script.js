import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
const orderForm = document.getElementById("orderForm");

if(orderForm){

    orderForm.addEventListener("submit", async (e)=>{

        e.preventDefault();

        await addDoc(
            collection(db,"orders"),
            {
                type:"cube",
                name:document.getElementById("name").value,
                colour:document.getElementById("colour").value,
                quantity:Number(document.getElementById("quantity").value),
                price:Number(document.getElementById("quantity").value)
            }
        );

        alert("Order submitted!");
        orderForm.reset();

    });

}

const specialForm = document.getElementById("specialForm");

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
                name:document.getElementById("specialName").value,
                description:document.getElementById("requestText").value,
                printTime:halfHours,
                price:halfHours * 0.5
            }
        );

        alert("Special request submitted!");
        specialForm.reset();

    });

}

window.checkPassword = async function(){

    if(
        document.getElementById("password").value
        !== "cubeadmin"
    ){
        alert("Incorrect password");
        return;
    }

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("ordersArea").style.display = "block";

    loadOrders();

};

async function loadOrders(){

    const container =
    document.getElementById("ordersList");

    const snapshot =
    await getDocs(
        collection(db,"orders")
    );

    let revenue = 0;
    let html = `

    <button
    class="hero-button"
    onclick="resetAllOrders()">

        RESET ALL ORDERS

    </button>

    <br><br>

    `;

    snapshot.forEach(orderDoc=>{

        const order =
        orderDoc.data();

        revenue +=
        Number(order.price || 0);

        if(order.type === "cube"){
html += `

<div class="order-card">

```
<h2>📦 Cube Order</h2>

<p><b>Name:</b> ${order.name}</p>

<p><b>Colour:</b> ${order.colour}</p>

<p><b>Quantity:</b> ${order.quantity}</p>

<p class="price">
    £${order.price.toFixed(2)}
</p>

<button onclick="editOrder('${orderDoc.id}')">
    Edit
</button>

<button onclick="deleteOrder('${orderDoc.id}')">
    Delete
</button>
```

</div>

`;


        }

        else{

            html += `

            <div class="order-card">

                <h2>🛠 Special Request</h2>

                <p><b>Name:</b> ${order.name}</p>

                <p><b>Request:</b> ${order.description}</p>

                <p><b>Print Time:</b>
                ${order.printTime}
                half-hours</p>

                <p class="price">
                    £${order.price.toFixed(2)}
                </p>

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

async function resetAllOrders(){

    const confirmed =
    confirm(
        "Delete ALL orders?"
    );

    if(!confirmed) return;

    const snapshot =
    await getDocs(
        collection(db,"orders")
    );

    for(const orderDoc of snapshot.docs){

        await deleteDoc(
            doc(
                db,
                "orders",
                orderDoc.id
            )
        );

    }

    loadOrders();

}

window.resetAllOrders =
resetAllOrders;

async function deleteOrder(id){

```
const confirmed =
confirm("Delete this order?");

if(!confirmed) return;

await deleteDoc(
    doc(db,"orders",id)
);

loadOrders();
```

}

window.deleteOrder =
deleteOrder;

async function editOrder(id){

```
const newName =
prompt("Customer name:");

if(!newName) return;

await updateDoc(
    doc(db,"orders",id),
    {
        name:newName
    }
);

loadOrders();
```

}

window.editOrder =
editOrder;
