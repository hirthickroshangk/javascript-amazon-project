import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';
//import '../data/cart-class.js';
//import '../../data/backend-practice.js'; 

Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('1OK');
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve('2OK');
    });
  })
]).then((values) => {
    console.log(values);
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary()
});

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('pass it');
  }); 

}).then((showit) => {
  return new Promise((resolve) => {
    console.log(showit); 
    loadCart(() => {
      resolve();
    });
  });

}).then((showIt) => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary()
});
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary()
  });
});
*/



