import { isValidDeliveryOption } from "./deliveryOptions.js";
export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));
  
  if (!cart) {
    cart = [{
      productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity : 2,
      deliveryOptionId: '1'
    },
    {
      productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity : 1,
      deliveryOptionId: '3'
    }];
  }
  }


function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
}



export function addToCart(productId,selectorQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += selectorQuantity;
  } else {
    cart.push({
      productId,
      quantity: selectorQuantity,
      deliveryOptionId: '1'
    });
  }
  saveToStorage();
}

export function deleteCartItem(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
    cart.forEach(CartItem => {
      cartQuantity += CartItem.quantity;
    });
  return cartQuantity;  
}

export function updateCartQuantity(productId,newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
    }
  });
  saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId) {
  if(!isValidDeliveryOption(deliveryOptionId)) {
    return;
  }

  let matchingItem;

  cart.forEach((cartItem) => {
    
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    } 
  });
  if (!matchingItem) {
    return;
  }


  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export async function loadCartFetch() {
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text();

  console.log(text);
}


export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    fun();
    console.log(xhr.response);
  });
  xhr.open('GET', 'http://supersimplebackend.dev/cart');
  xhr.send();
}
