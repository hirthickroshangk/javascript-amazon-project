import { cart, deleteCartItem, updateCartQuantity, updateDeliveryOption } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import formatCurrency  from '../utils/money.js';
import {deliveryOptions, getDeliveryOption, 
  calculateDeliveryDate
} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';


export function renderOrderSummary() {

let cartSummaryHTML = '';
cart.forEach((cartItem)   => {
  let matchingProduct = getProduct(cartItem.productId);
  
  const deliveryOptionId = cartItem.deliveryOptionId;  
  const matchingDeliveryOption = getDeliveryOption(deliveryOptionId);
  const formatedDeliveryDate =  calculateDeliveryDate(matchingDeliveryOption);

  cartSummaryHTML += `
  <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${formatedDeliveryDate}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name
                product-name-${matchingProduct.id}">
                  ${matchingProduct.name}
                </div>
                <div class="product-price product-price-${matchingProduct.id}">
                  ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity
                js-product-quantity-${matchingProduct.id}">
                  <span>
                    Quantity: <span class="quantity-label
                    js-quantity-label-${matchingProduct.id}">${cartItem
                      .quantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary
                  js-update-quantity-link" data-product-id = 
                  "${matchingProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input 
                  js-input-quantity-${matchingProduct.id}">
                  <span class="save-quantity-link link-primary 
                  js-save-quantity-link"    
                  data-product-id = "${matchingProduct.id}">
                  Save
                  </span>
                  <span class="delete-quantity-link link-primary
                  js-delete-link
                  js-delete-link-${matchingProduct.id}
                  " data-product-id = "${matchingProduct.id}">
                    Delete
                  </span>
                 
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${renderDeliveryOptions(cartItem)}
                </div>
              </div>
            </div>
          </div>
  `;
});

function renderDeliveryOptions(cartItem) {
  let deliveryOptionsHTML = '';
  
  deliveryOptions.forEach((deliveryOption) => {
    const formatedDeliveryDate = calculateDeliveryDate(deliveryOption);
    const priceString = deliveryOption.priceCents === 0 
    ?
    'FREE'
    : `${formatCurrency(deliveryOption.priceCents)} -`;
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    
    deliveryOptionsHTML += `
      <div class="delivery-option js-delivery-option js-delivery-option-${cartItem.productId}-${deliveryOption.id}" 
      data-product-id = "${cartItem.productId}" 
      data-delivery-option-id = "${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input js-delivery-input-${cartItem.productId}-${deliveryOption.id}"
          name="delivery-option-${cartItem.productId}">
        <div>
          <div class="delivery-option-date">
            ${formatedDeliveryDate}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;
  });
  return deliveryOptionsHTML;
}

document.querySelector('.js-order-summary').innerHTML =
  cartSummaryHTML;

document.querySelectorAll('.js-delete-link').
forEach((link) => {
  link.addEventListener('click',() => {
    const productId = link.dataset.productId;
    deleteCartItem(productId);
    renderPaymentSummary();
    renderOrderSummary();
    renderCheckoutHeader();

  }); 
});




document.querySelectorAll('.js-update-quantity-link')
  .forEach((updateLink) => {
    updateLink.addEventListener('click',() => {
      const productId = updateLink.dataset.productId;
      const container = document.
      querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    
    });
  });
  document.querySelectorAll('.js-save-quantity-link')
  .forEach((saveLink) => {
    const productId = saveLink.dataset.productId;
    const inputElement = document
      .querySelector(`.js-input-quantity-${productId}`);
    
    saveLink.addEventListener('click',() => {
     handleUpdate(productId,inputElement);
    });

    inputElement.addEventListener('keydown',(event) => {
      if(event.key === 'Enter') handleUpdate(productId,inputElement);
    });
  });
  
  function handleUpdate(productId,inputElement) {
    const container = document.
      querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');
      
      const newQuantity = Number(inputElement.value);
      if (newQuantity > 0 && newQuantity < 1000) {
        updateCartQuantity(productId,newQuantity);
        renderCheckoutHeader();
        renderPaymentSummary();
        renderOrderSummary();
      }
    } 

  document.querySelectorAll('.js-delivery-option')
   .forEach((element) => {
    element.addEventListener('click',() => {
      const {productId,deliveryOptionId} = element.dataset;  
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
      });

   });  
  }
















