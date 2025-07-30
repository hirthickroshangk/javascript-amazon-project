import {Products,Appliance,Clothing } from "../../data/products.js";

describe('test suite: Product class', () => {
  let testProduct;
  beforeEach(() => {
      testProduct = new Products({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090
    });
  });
  it('should create the class instance with correct properties', () => {
    expect(testProduct.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(testProduct.image).toEqual('images/products/athletic-cotton-socks-6-pairs.jpg');
    expect(testProduct.rating).toEqual({stars: 4.5,count: 87});
    expect(testProduct.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(testProduct.image).toEqual('images/products/athletic-cotton-socks-6-pairs.jpg');
    expect(testProduct.priceCents).toEqual(1090);
  });
  it('should return correct stars link', () => {
    expect(testProduct.getStarsUrl()).toEqual(
      'images/ratings/rating-45.png'
    );
    });
  it('should return correct formatted price',() => {
    expect(testProduct.getPrice()).toEqual('$10.90');
  });
  it('extraInfoHTML should return empty string', () => {
    expect(testProduct.extraInfoHTML()).toEqual('');
  });
});

describe('test suite: Clothing class ', () => {
  let testProduct;
  beforeEach(() => {
    testProduct = new Clothing({
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 3.5,
      count: 9000
    },
    priceCents: 899,
    sizeChartLink: "images/clothing-size-chart.png"
    });
  });
  it('should create a clothing instance with correct properties', () => {
    expect(testProduct.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(testProduct.image).toEqual('images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg');
    expect(testProduct.rating).toEqual({stars: 3.5,count: 9000});
    expect(testProduct.name).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
    expect(testProduct.priceCents).toEqual(899);
    expect(testProduct.sizeChartLink).toEqual('images/clothing-size-chart.png');
  });
  it('should create method to return correct sizechartlink', () => {
    expect(testProduct.extraInfoHTML()).toContain(testProduct.sizeChartLink);
  });
  });

describe('test suite: Appliance class ', () => {
  let testProduct;
  beforeEach(() => {
    testProduct = new Appliance({
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 799,
    instructionLink: '../images/appliance-instructions.png',
    warrantyLink: '../images/appliance-warranty.png'
    });
  });
  it('should create a appliance instance with correct properties', () => {
    expect(testProduct.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(testProduct.image).toEqual('images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg');
    expect(testProduct.rating).toEqual({stars: 4.5,count: 56});
    expect(testProduct.name).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
    expect(testProduct.priceCents).toEqual(799);
    expect(testProduct.warrantyLink).toEqual('../images/appliance-warranty.png');
    expect(testProduct.instructionLink).toEqual('../images/appliance-instructions.png');
  });
  it('should create extraInfoHTML method with correct links', () => {
    expect(testProduct.extraInfoHTML()).toContain(testProduct.warrantyLink);
    expect(testProduct.extraInfoHTML()).toContain(testProduct.instructionLink);
  });
  it('should return correct stars link', () => {
    expect(testProduct.getStarsUrl()).toEqual(
      'images/ratings/rating-45.png'
    );
    });
  it('should return correct formatted price',() => {
    expect(testProduct.getPrice()).toEqual('$7.99');
  });
});



