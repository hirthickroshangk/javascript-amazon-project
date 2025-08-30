import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProductFetch, loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';
//import '../data/cart-class.js';
//import '../../data/backend-practice.js'; 



async function loadProducts2() {
try {

  await loadProductFetch();
  const value1 = await new Promise((resolve, reject) => {

    loadCart(() => {
      reject('error3');
      resolve('value01');
    });
  });
} catch(error) {

  console.log('unexpectedly we met with a error, please give us time to rectify it');

  
    
}

  
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();

}
loadProducts2();
   
/*
Promise.all([
  loadProductFetch()
  ,
  new Promise((resolve) => {
    loadCart(() => {
      resolve('check1');
    });
  })
]).then((values) => {
    console.log(values);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary()
});

*/
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



