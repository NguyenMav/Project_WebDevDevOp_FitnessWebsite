//For this Part 2 of the project, I have added JavaScript which wasn't in the project Part 1
// Function to handle search functionality for all webpages
function handleSearch(event) {
    event.preventDefault();
    var searchQuery = document.getElementById("searchInput").value.toLowerCase();
    var searchResults = {
        "home": { url: "home.html", section: "" },
        "blog": { url: "blog.html", section: "" },
        "coaching": { url: "coaching.html", section: "" },
        "merchandise": { url: "merchandise.html", section: "" },
        "about": { url: "about.html", section: "" },
        "contact": { url: "contact.html", section: "" },
        "hypertrophy": { url: "blog.html", section: "#hypertrophy" },
        "overloading": { url: "blog.html", section: "#overloading" },
        "deloading": { url: "blog.html", section: "#deloading" },
        "mobility": { url: "blog.html", section: "#mobility" },
        "cardiovascular": { url: "blog.html", section: "#cardio" },
        "about us": { url: "about.html", section: "#AboutUs" },
        "our vision": { url: "about.html", section: "#OurVision" },
    };
    if (searchQuery.trim() === "") {
        alert("Please enter a search term.");
        return;
    }
    if (searchQuery in searchResults) {
        var result = searchResults[searchQuery];
        window.location.href = result.url + result.section;
    } else {
        alert("No matching result found for '" + searchQuery + "'. Please try again.");
    }
}

// Function to handle subscription form submission and validation for all webpages
document.addEventListener("DOMContentLoaded", function() {
    var subscribeForm = document.getElementById("subscribeForm");
    var errorMessage = document.getElementById("errorMessage");
    subscribeForm.addEventListener("submit", function(event) {
        var emailInput = document.getElementById("emailInput");
        var email = emailInput.value.trim();
        if (!email) {
            event.preventDefault();
            errorMessage.innerText = "Please enter an email address.";
            return;
        }
        if (!isValidEmail(email)) {
            event.preventDefault();
            errorMessage.innerText = "Please enter a valid email address.";
        }
    });

    // Function to validate email format
    function isValidEmail(email) {
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }
});

// Function to add items to the shopping cart in merchandise.html
function addToCart(productName, price, colorSelectId, sizeSelectId, quantityInputId) {
    var color = document.getElementById(colorSelectId).value;
    var size = document.getElementById(sizeSelectId).value;
    var quantity = parseInt(document.getElementById(quantityInputId).value);
    var totalPrice = price * quantity;
    var existingItem = findExistingItem(productName, color, size);
    if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice += totalPrice;
        existingItem.row.cells[3].innerText = "$" + existingItem.totalPrice.toFixed(2); 
        existingItem.row.cells[4].innerText = existingItem.quantity; 
    } else {
        var shoppingListBody = document.getElementById("shoppingListBody");
        var newRow = shoppingListBody.insertRow();
        newRow.innerHTML = `
            <td>${productName}</td>
            <td>${color}</td>
            <td>${size}</td>
            <td>$${totalPrice.toFixed(2)}</td>
            <td>${quantity}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(this)">Remove</button></td>`; 
    }
    updateOrderSummary();
    saveShoppingListData();
}

// Function to remove items from the shopping cart
function removeFromCart(button) {
    var row = button.closest("tr");
    row.remove();
    updateOrderSummary();
    saveShoppingListData();
}

// Function to find existing items in the shopping cart
function findExistingItem(productName, color, size) {
    var rows = document.getElementById("shoppingListBody").getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        if (cells[0].innerText === productName && cells[1].innerText === color && cells[2].innerText === size) {
            return {
                row: rows[i],
                quantity: parseInt(cells[4].innerText),
                totalPrice: parseFloat(cells[3].innerText.substr(1))
            };
        }
    }
    return null;
}

// Function to update order summary in the shopping cart
function updateOrderSummary() {
    var subtotal = 0;
    var rows = document.getElementById("shoppingListBody").getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        subtotal += parseFloat(rows[i].getElementsByTagName("td")[3].innerText.substr(1)); // Remove '$' sign and convert to float
    }
    var salesTax = subtotal * 0.1; 
    var grandTotal = subtotal + salesTax;
    document.getElementById("subtotal").innerText = "$" + subtotal.toFixed(2);
    document.getElementById("salesTax").innerText = "$" + salesTax.toFixed(2);
    document.getElementById("grandTotal").innerText = "$" + grandTotal.toFixed(2);
}

// Function to save shopping list data in session storage
function saveShoppingListData() {
    var shoppingListData = [];
    var shoppingListRows = document.getElementById("shoppingListBody").getElementsByTagName("tr");
    for (var i = 0; i < shoppingListRows.length; i++) {
        var rowData = {
            product: shoppingListRows[i].cells[0].innerText,
            color: shoppingListRows[i].cells[1].innerText,
            size: shoppingListRows[i].cells[2].innerText,
            totalPrice: shoppingListRows[i].cells[3].innerText,
            quantity: shoppingListRows[i].cells[4].innerText
        };
        shoppingListData.push(rowData);
    }
    sessionStorage.setItem("shoppingListData", JSON.stringify(shoppingListData));
}

// Event listener to handle checkout process
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("proceedToCheckoutBtn").addEventListener("click", function(event) {
        event.preventDefault();
        var shoppingListBody = document.getElementById("shoppingListBody");
        var shoppingListRows = shoppingListBody.getElementsByTagName("tr");
        var shoppingListData = [];
        for (var i = 0; i < shoppingListRows.length; i++) {
            var rowData = {
                product: shoppingListRows[i].cells[0].innerText,
                color: shoppingListRows[i].cells[1].innerText,
                size: shoppingListRows[i].cells[2].innerText,
                totalPrice: shoppingListRows[i].cells[3].innerText,
                quantity: shoppingListRows[i].cells[4].innerText
            };
            shoppingListData.push(rowData);
        }
        var subtotal = document.getElementById("subtotal").innerText;
        var salesTax = document.getElementById("salesTax").innerText;
        var grandTotal = document.getElementById("grandTotal").innerText;
        sessionStorage.setItem("shoppingListData", JSON.stringify(shoppingListData));
        sessionStorage.setItem("subtotal", subtotal);
        sessionStorage.setItem("salesTax", salesTax);
        sessionStorage.setItem("grandTotal", grandTotal);
        window.location.href = "checkout.html";
    });
});

// Event listener to populate shopping cart and order summary
document.addEventListener("DOMContentLoaded", function() {
    var currentPage = window.location.pathname;
    var shoppingListData = JSON.parse(sessionStorage.getItem("shoppingListData"));
    var subtotal = sessionStorage.getItem("subtotal");
    var salesTax = sessionStorage.getItem("salesTax");
    var grandTotal = sessionStorage.getItem("grandTotal");
    var shoppingListBody = document.getElementById("shoppingListBody");
    for (var i = 0; i < shoppingListData.length; i++) {
        var row = shoppingListBody.insertRow();
        row.innerHTML = `
            <td>${shoppingListData[i].product}</td>
            <td>${shoppingListData[i].color}</td>
            <td>${shoppingListData[i].size}</td>
            <td>${shoppingListData[i].totalPrice}</td>
            <td>${shoppingListData[i].quantity}</td>`;
        if (currentPage.includes("merchandise.html")) {
            row.innerHTML += `<td><button class="btn btn-danger btn-sm" onclick="removeFromCart(this)">Remove</button></td>`;
        }
    }
    document.getElementById("subtotal").innerText = subtotal;
    document.getElementById("salesTax").innerText = salesTax;
    document.getElementById("grandTotal").innerText = grandTotal;
});