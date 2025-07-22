import {cart, addToCart, loadFromStorage, deleteCartItem, updateDeliveryOption} from '../../data/cart.js';

describe('test suite: addToCart', () => {
  beforeEach(() => {
    spyOn(localStorage,'setItem');
  }); 

  it('adds a existing product to the cart', () => {
    spyOn(localStorage,'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1' 
      }]);
    });
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(
      [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1' 
      }]
    ));
  });
  
  it('adds a new product to a cart', () => {
    spyOn(localStorage,'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); 
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1' 
    }]));
  });
});

describe('test suite: deleteCartItem', () => {
  beforeEach(() => {
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1' 
      }]);
    });
    loadFromStorage();
    
  });
  
  it('Deletes existing item from cart', () => {
    deleteCartItem('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(
      cart.length
    ).toEqual(0);
    expect(
      localStorage.setItem
    ).toHaveBeenCalledTimes(1);
    expect(
      localStorage.setItem
    ).toHaveBeenCalledWith('cart',JSON.stringify([]));
  });

  it('deletes non existing item in the cart', () => {
    deleteCartItem('hshshhsd');
    expect(
      cart.length
    ).toEqual(1);
    expect(
      localStorage.setItem
    ).toHaveBeenCalledTimes(1);
    expect(
      localStorage.setItem
    ).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1' 
    }]));
  }); 

});

describe('test suite: updateDeliveryOption', () => {
  beforeEach(() => {
    spyOn(localStorage,'setItem');

    spyOn(localStorage,'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity : 2,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

  });
  it('updates the deliveryOptionId', () => {
    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6','2');
    expect(
      cart.length
    ).toEqual(1);
    expect(
      cart[0].deliveryOptionId
    ).toEqual('2');
    expect(
      cart[0].quantity
    ).toEqual(2);
    expect(
      cart[0].productId
    ).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(
      localStorage.setItem
    ).toHaveBeenCalledTimes(1);
    expect(
      localStorage.setItem
    ).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity : 2,
        deliveryOptionId: '2'
    }]));
  });

  it('returns nothing when productId not in cart', () => {
    updateDeliveryOption('buck-you','3');
    expect(
      localStorage.setItem
    ).toHaveBeenCalledTimes(0);
    expect(cart.length).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });

  it('returns nothing when id is not valid', () => {
    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6','8');
    expect(
      localStorage.setItem
    ).toHaveBeenCalledTimes(0);
    expect(cart.length).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  })
  

});