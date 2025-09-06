import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart, updateCartQuantity } from '../../data/cart.js';
import { getProduct, loadProductFetch } from "../../data/products.js";
import formatCurrency from "../../scripts/utils/money.js";
import {loadProducts} from "../../data/products.js";



describe('test suite: renderOrderSummary', () => {
  let product1Id;
  let product2Id;
  let product1Name;
  let product2Name;
  let product1Price;
  let product2Price;

  beforeAll(async() => {
    await loadProductFetch();
      product1Id = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
      product2Id = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
      product1Name = getProduct(product1Id).name;
      product2Name = getProduct(product2Id).name;
      product1Price = `$${formatCurrency(getProduct(product1Id).priceCents)}`;
      product2Price =`$${formatCurrency(getProduct(product2Id).priceCents)}`;
    }); 
  
  beforeAll((done) => {
    loadProductFetch().then ( () => {
      product1Id = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
      product2Id = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
      product1Name = getProduct(product1Id).name;
      product2Name = getProduct(product2Id).name;
      product1Price = `$${formatCurrency(getProduct(product1Id).priceCents)}`;
      product2Price =`$${formatCurrency(getProduct(product2Id).priceCents)}`;
      done();
    });
    
  }); 

  
  
  beforeEach(() => {
    
    spyOn(localStorage,'setItem');
    document.querySelector('.js-test-container').innerHTML = `
    <div class = "js-order-summary"></div>
    <div class = "js-payment-summary"></div>
    <div class = "js-checkout-header"></div>
    `;

  spyOn(localStorage,'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId : product1Id,
        quantity : 2,
        deliveryOptionId: '1'
      },
      {
        productId : product2Id,
        quantity : 1,
        deliveryOptionId: '2'
      }]);
    });
    loadFromStorage();
    renderOrderSummary();
  });
  
  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = ``;

  }); 
  
  it('displays the cart', () => {
     expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    expect(
      document.querySelector(`.js-product-quantity-${product1Id}`).innerText
    ).toContain('Quantity: 2');
    expect(
      document.querySelector(`.js-product-quantity-${product2Id}`).innerText
    ).toContain('Quantity: 1');
    expect(
      document.querySelector(`.product-name-${product2Id}`).innerText
    ).toEqual(product2Name);
    expect(
      document.querySelector(`.product-name-${product1Id}`).innerText
    ).toEqual(product1Name);
    expect(
      document.querySelector(`.product-price-${product1Id}`).innerText
    ).toEqual(product1Price);
    expect(
      document.querySelector(`.product-price-${product2Id}`).innerText
    ).toEqual(product2Price);
  });

  it('removes the product', () => {
    
    document.querySelector(`.js-delete-link-${product1Id}`).click();
    expect(
    document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${product1Id}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${product2Id}`)
    ).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(product2Id);
    expect(
      document.querySelector(`.product-name-${product2Id}`).innerText
    ).toEqual(product2Name);
    expect(
      document.querySelector(`.product-price-${product2Id}`).innerText
    ).toEqual(product2Price);
  });

  it('updates the delivery option', () => {
    document.querySelector(`.js-delivery-option-${product1Id}-3`).click();
    expect(
    document.querySelector(`.js-delivery-input-${product1Id}-3`).checked
    ).toEqual(true);
    expect(
      cart.length
    ).toEqual(2);
    expect(
      cart[0].productId
    ).toEqual(product1Id);  
    expect(
      cart[0].deliveryOptionId
    ).toEqual('3');
    expect(
      document.querySelector('.payment-summary-shipping-money').innerText
    ).toEqual('$14.98');
    expect(
      document.querySelector('.payment-summary-total-money').innerText
    ).toEqual('$63.50');
  });

  

});