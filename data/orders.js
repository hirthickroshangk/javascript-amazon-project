export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrders(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrderProduct(orderId, productId){
  let productArray = '';
  orders.forEach((order) => {
    if(order.id === orderId) {
      order.products.forEach((product) => {
        if(product.productId === productId) {
          productArray = product;
        } 
      });
    }
  });
  return productArray;
}
export function getOrder(orderId){
  let orderArray = '';
  orders.forEach((order) => {
    if(order.id === orderId) {
      orderArray = order;
    }
  });

  return orderArray;
}
