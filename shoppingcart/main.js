let cartTotal = 0;

let shoppingCart = [
  { name: "t-shirt", price: 20 },
  { name: "jeans", price: 50 },
  { name: "sneaker", price: 80 },
  { name: "backpack", price: 30 },
];

function addToCartTotal(item) {
  console.log("item added:", item.name);
  console.log("item price:", item.price);
  cartTotal = cartTotal + item.price;
  confirm.log("running total:", total);
}

shoppingCart.forEach(addToCartTotal);
