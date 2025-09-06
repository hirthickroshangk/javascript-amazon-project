import {getProduct, loadProductFetch} from '../data/products.js';
import { getOrderProduct, getOrder} from '../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function loadPage() {
  await loadProductFetch();
  
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');
  
  const product = getProduct(productId);
  const orderProduct = getOrderProduct(orderId,productId);
  const orderTimeString = dayjs(orderProduct.estimatedDeliveryTime).format('MMMM D');
  const order = getOrder(orderId);
  
  
  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliverTime = dayjs(orderProduct.estimatedDeliveryTime);
  const percentProgress = ((today - orderTime) / (deliverTime - orderTime)) * 100;


  document.querySelector('.js-order-tracking').innerHTML = `
    
  <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>
  
    <div class="delivery-date">
      Arriving on ${orderTimeString}
    </div>
  
    <div class="product-info">
      ${product.name}
    </div>
  
    <div class="product-info">
      Quantity: ${orderProduct.quantity}
    </div>
  
    <img class="product-image" src="${product.image}">
  
    <div class="progress-labels-container">
      <div class="progress-label ${
        percentProgress < 50 ? "current-status" : ''
      }">
        Preparing
      </div>
      <div class="progress-label ${
        percentProgress >= 50 ? "current-status" : ''
      }">
        Shipped
      </div>
      <div class="progress-label${
        percentProgress >= 100 ? "current-status" : ''
      }">
        Delivered
      </div>
    </div>
  
    <div class="progress-bar-container">
      <div class="progress-bar" style = "width : ${percentProgress}%"></div>
    </div>  
  `;
}
loadPage();

