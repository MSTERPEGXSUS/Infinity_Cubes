import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// IMPORTANT: db must exist from your firebase init file
// const db = getFirestore(app);

const orderForm = document.getElementById("orderForm");
const specialForm = document.getElementById("specialForm");
const ordersList = document.getElementById("ordersList");

// ---------------- LOGIN ----------------

async function checkPassword() {
    const passwordInput = document.getElementById("password");

    if (!passwordInput) {
        alert("Password box not found");
        return;
    }

    if (passwordInput.value !== "cubeadmin") {
        alert("Incorrect password");
        return;
    }

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("ordersArea").style.display = "block";

    loadOrders();
}

window.checkPassword = checkPassword;

// ---------------- CREATE CUBE ORDER ----------------

if (orderForm) {
    orderForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, "orders"), {
                type: "cube",
                name: document.getElementById("name").value,
                colour: document.getElementById("colour").value,
                quantity: Number(document.getElementById("quantity").value),
                price: Number(document.getElementById("quantity").value)
            });

            alert("Order submitted!");
            orderForm.reset();
        } catch (err) {
            console.error(err);
            alert("Failed to submit order: " + err.message);
        }
    });
}

// ---------------- SPECIAL ORDER ----------------

if (specialForm) {
    specialForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        try {
            const halfHours = Number(document.getElementById("printTime").value);

            await addDoc(collection(db, "orders"), {
                type: "special",
                name: document.getElementById("specialName").value,
                description: document.getElementById("requestText").value,
                printTime: halfHours,
                price: halfHours * 0.5
            });

            alert("Special request submitted!");
            specialForm.reset();
        } catch (err) {
            console.error(err);
            alert("Failed to submit special order: " + err.message);
        }
    });
}

// ---------------- LOAD ORDERS ----------------

async function loadOrders() {
    if (!ordersList) return;

    try {
        const snapshot = await getDocs(collection(db, "orders"));

        let revenue = 0;

        let html = `
            <button class="hero-button" onclick="resetAllOrders()">
                RESET ALL ORDERS
            </button>
            <br><br>
        `;

        snapshot.forEach((orderDoc) => {
            const order = orderDoc.data();
            revenue += Number(order.price || 0);

            if (order.type === "cube") {
                html += `
                    <div class="order-card">
                        <h2>📦 Cube Order</h2>

                        <p><b>Name:</b> ${order.name}</p>
                        <p><b>Colour:</b> ${order.colour}</p>
                        <p><b>Quantity:</b> ${order.quantity}</p>

                        <p class="price">£${Number(order.price).toFixed(2)}</p>

                        <button onclick="editOrder('${orderDoc.id}', '${order.name}')">Edit</button>
                        <button onclick="deleteOrder('${orderDoc.id}')">Delete</button>
                    </div>
                `;
            } else {
                html += `
                    <div class="order-card">
                        <h2>🛠 Special Request</h2>

                        <p><b>Name:</b> ${order.name}</p>
                        <p><b>Request:</b> ${order.description}</p>
                        <p><b>Print Time:</b> ${order.printTime} half-hours</p>

                        <p class="price">£${Number(order.price).toFixed(2)}</p>

                        editOrder('${orderDoc.id}', {
    name: '${order.name}',
    colour: '${order.colour}',
    quantity: '${order.quantity}'
})
                        <button onclick="deleteOrder('${orderDoc.id}')">Delete</button>
                    </div>
                `;
            }
        });

        html += `
            <div class="cart-total">
                Total Revenue<br><br>
                £${revenue.toFixed(2)}
            </div>
        `;

        ordersList.innerHTML = html;

    } catch (err) {
        console.error(err);
        alert("Failed to load orders: " + err.message);
    }
}

// ---------------- DELETE SINGLE ORDER ----------------

async function deleteOrder(id) {
    const confirmDelete = confirm("Delete this order?");
    if (!confirmDelete) return;

    try {
        await deleteDoc(doc(db, "orders", id));
        loadOrders();
    } catch (err) {
        console.error(err);
        alert("Delete failed: " + err.message);
    }
}

window.deleteOrder = deleteOrder;

// ---------------- EDIT ORDER ----------------

async function editOrder(id, currentOrder) {
    const newName = prompt("Customer name:", currentOrder.name);
    if (!newName) return;

    const newColour = prompt("Colour:", currentOrder.colour);
    if (!newColour) return;

    const newQuantity = prompt("Quantity:", currentOrder.quantity);
    if (!newQuantity) return;

    try {
        await updateDoc(doc(db, "orders", id), {
            name: newName,
            colour: newColour,
            quantity: Number(newQuantity)
        });

        loadOrders();
    } catch (err) {
        console.error(err);
        alert("Edit failed: " + err.message);
    }
}

window.editOrder = editOrder;

// ---------------- RESET ALL ORDERS ----------------

async function resetAllOrders() {
    const confirmReset = confirm("Delete ALL orders?");
    if (!confirmReset) return;

    try {
        const snapshot = await getDocs(collection(db, "orders"));

        for (const orderDoc of snapshot.docs) {
            await deleteDoc(doc(db, "orders", orderDoc.id));
        }

        loadOrders();
    } catch (err) {
        console.error(err);
        alert("Reset failed: " + err.message);
    }
}

window.resetAllOrders = resetAllOrders;
