export const cart = [];

export function addToCart(productId) {
  const selectorElement = document.querySelector(`.js-quantity-selector-${productId}`);
  const selectorQuantity = selectorElement.value;
  let matchingItem;

  cart.forEach((CartItem) => {
    if (productId === CartItem.productId) {
      matchingItem = CartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += Number(selectorQuantity);
  } else {
    cart.push({
      productId,
      quantity: Number(selectorQuantity)
    });
  }
}