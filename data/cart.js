export const cart = [{
  productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity : 1
},
{
  productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity : 1
}];

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