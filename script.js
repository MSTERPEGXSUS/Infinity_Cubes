<!DOCTYPE html>
<html>
<head>
    <title>Orders</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div id="loginBox" class="admin-container">

    <h1>Orders Panel</h1>

    <input
    type="password"
    id="password"
    placeholder="Enter Password">

    <br><br>

    <button onclick="checkPassword()">
        Access Orders
    </button>

</div>

<div
id="ordersArea"
style="display:none;">

    <div
    class="admin-container"
    id="ordersList">
    </div>

</div>

<script src="script.js"></script>

<script>

function checkPassword(){

    const pass =
    document.getElementById("password").value;

    if(pass === "cubeadmin"){

        document.getElementById("loginBox").style.display = "none";

        document.getElementById("ordersArea").style.display = "block";

        displayOrders();

    }

    else{

        alert("Incorrect password");

    }

}

</script>

</body>
</html>
