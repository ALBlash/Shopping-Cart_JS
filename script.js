const products = [
    new Product(1, "FinePix Pro2 3D Camera", "1800.00", "camera.jpg"),
    new Product(2, "EXP Portable HD", "800.00", "external-hard-drive.jpg"),
    new Product(3, "Luxury Ultra thin Wrist Watch", "500.00", "laptop.jpg"),
    new Product(4, "XP 1155 Intel Core Laptop", "1000.00", "watch.jpg"),
];

function Product(id, name, price, photo) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.photo = photo;
}

showProductGallery();// draw the procucts on the page if html
showCartTable();// draws the 

function showProductGallery() {
    const productsContainerElem = document.querySelector(".product-items");

    let productsHTML = "";

    // runs the products one after another to add them to the html page and takes there deteiles from the constrocter function; 
    products.forEach((product) => {
        productsHTML += `
            <div class="product-item">
                <input class="product-id" type="hidden" value="${product.id}">
                <img src="./product-images/${product.photo}" alt="${product.name}" />
                <p class="product-name">${product.name}</p>
                <p class="product-price">$${product.price}</p>
                <div class="cart-action">
                    <input
                        type="number"
                        class="product-quantity"
                        name="quantity"
                        value="1"
                        min="1"
                        size="2"
                    /> 
                    <button class="add-to-cart" onclick="addToCart(this)">Add</button>
                    <button class="remove-from-cart" onclick="removeFromCart(this)">Remove</button>
                </div>
            </div>
        `;
    });

    productsContainerElem.innerHTML = productsHTML;
}

// getting the information of a spesific product by pressing add
// the "element" is refering to the button "add";
function addToCart(element) {

    // get me the closest element with the class ".product-item"
    const productParent = element.closest(".product-item");


    //get the id of productParent
    const id = productParent.querySelector(".product-id").value;
    //get the price & name & quantity of the productParent
    const price = productParent.querySelector(".product-price").innerText;
    const name = productParent.querySelector(".product-name").innerText;
    const quantity = productParent.querySelector(".product-quantity").value;


    // containes all the information of the product;
    const cartItem = {
        id, // identify the specific item ( so if we want to add another one we can check if it exist's in the "shopping-cart")
        price,
        name,
        quantity,
    };

    let cartArray = new Array();


    // we are checking if this item exist's in the "shopping-cart"
    if (sessionStorage.getItem('shopping-cart')) {

        // turning it back to obj because its saved as a string;
        cartArray = JSON.parse(sessionStorage.getItem("shopping-cart"));

        // we are looking for something specific in the array [id], and finding it with the "findIndex" event; 
        const index = cartArray.findIndex(item => item.id === id);

        // if this item exist's the value that returns is a number and shouldn't be a -1
        if (index !== -1) {
            // and now we take the quantity and we add it to the quantity that it is right now
            cartArray[index].quantity =
                Number(cartArray[index].quantity) + Number(quantity);
        } else {
            cartArray.push(cartItem)
        }
    } else {
        // if its the first time of an item and it dosent exist in the "seesion" so we add it here
        cartArray.push(cartItem);
    }

    // we add the new item to the seesion
    sessionStorage.setItem('shopping-cart', JSON.stringify(cartArray));
    showCartTable(); // we call this function so it can take the array with the updated information and add it to the body


};


function removeFromCart(element) {
    const productParent = element.closest(".product-item");
    const id = productParent.querySelector(".product-id").value;
    const quantity = productParent.querySelector(".product-quantity").value;

    let cartArray = new Array();
    if (sessionStorage.getItem('shopping-cart')) {
        // so if we do have this item existing in the shopping-cart, so we add the new item to it...(we identify with prudocts id and add it thruogh the quatity)
        cartArray = JSON.parse(sessionStorage.getItem('shopping-cart'))

        const index = cartArray.findIndex(item => item.id === id);
        if (index !== -1) {
            cartArray[index].quantity = Math.max(
                Number(cartArray[index].quantity) - Number(quantity), 0);

            if (!cartArray[index].quantity) {
                cartArray = cartArray.filter((value, i) => i !== index)
            }
        }
    }


    sessionStorage.setItem('shopping-cart', JSON.stringify(cartArray));
    showCartTable();
}





function showCartTable() {
    // shopingCartTbody is the Tbody where we add the item...
    // if we want to keep it in the sessionStorage we need to "string" it...(and its saved under the key "shopping-cart" )
    const shopingCartTbody = document.getElementById('cartTableBody');
    shopingCartTbody.innerHTML = '';

    //we want to check if 'shopping-cart' exist
    if (sessionStorage.getItem('shopping-cart')) {
        //we most to turn it back to object if we want to work with it...
        const cartArray = JSON.parse(sessionStorage.getItem('shopping-cart'));
        // quantity in total - how many items of the same product...
        let itemCount = 0;
        let total = 0;

        // gets the item and all of its details
        cartArray.forEach((item) => {
            console.log(item);

            //gets the price and cuts out the $ simble so we can do the math just with the number
            const price = item.price.slice(1);
            // parseInt just makes the number not string
            const quantity = parseInt(item.quantity);

            //this make the math for how much U owe in total 
            const subTotal = price * quantity;

            //add up the quantity
            itemCount += quantity;
            total += subTotal;

            //building the html....
            let tr = `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.quantity}</td>
                    <td>$${subTotal}</td>
                </tr>
            `;

            // adding up to the html body the tr.
            shopingCartTbody.innerHTML += tr;
        })

        // should be adding to the quantity that's on the page the number
        document.getElementById('itemCount').innerText = itemCount;

        // should be adding to the Total that's on the page the number
        document.getElementById('totalAmount').innerText = `$${total}`;

    } else {
        // if its empty turns the count and amount to 0
        document.getElementById('itemCount').innerText = 0;
        document.getElementById('totalAmount').innerText = `$0`;
    }
};



function emptyCart() {
    //empty's  the cart
    if (sessionStorage.getItem('shopping-cart')) {
        sessionStorage.removeItem('shopping-cart');
        showCartTable();// update the page as well 
    }

}