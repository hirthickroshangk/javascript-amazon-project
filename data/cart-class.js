import { isValidDeliveryOption } from "./deliveryOptions.js";

class Cart {
  cartItems = undefined;
  #localStorageKey = undefined;
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }
  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    
    if (!this.cartItems) {
        this.cartItems = [{
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

  saveToStorage() {
    localStorage.setItem(`${this.#localStorageKey}`,JSON.stringify(this.cartItems));
  }

  addToCart(productId,selectorQuantity) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    if (matchingItem) {
      matchingItem.quantity += selectorQuantity;
    } else {
      this.cartItems.push({
        productId,
        quantity: selectorQuantity,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }

  deleteCartItem(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
      this.cartItems.forEach(CartItem => {
        cartQuantity += CartItem.quantity;
      });
    return cartQuantity;  
  }

  updateCartQuantity(productId,newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity = newQuantity;
      }
    });
    this.saveToStorage();
  }


  updateDeliveryOption(productId,deliveryOptionId) {
    if(!isValidDeliveryOption(deliveryOptionId)) {
      return;
    }
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      } 
    });
    if (!matchingItem) {
      return;
    }
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}




const cart = new Cart('cart-oop');
cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e',3);

const businessCart = new Cart('cart-business');

 
console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);












