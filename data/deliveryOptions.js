import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
},
{
  id: '2',
  deliveryDays: 3,
  priceCents: 499
},
{
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}  
];

export function getDeliveryOption(deliveryOptionId) {
  let matchingDeliveryOption;
  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId) {
      matchingDeliveryOption = option;
    }
  });
  return matchingDeliveryOption || deliveryOptions[0];
}


function isWeekend(inDay) {
  let day = inDay.format('dddd');
  return day === 'Saturday' || day === 'Sunday';
}

export function calculateDeliveryDate(deliveryOption) {
  const deliveryDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();
  let i = 0;
  
  while(i < deliveryDays) {
    deliveryDate = deliveryDate.add(1,'day');
    if (!isWeekend(deliveryDate)) {
      i++;
    }
  }
  return deliveryDate.format('dddd, MMMM D');
}

export function isValidDeliveryOption(deliveryOption) {
  let found = false;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOption) {
      found = true;
    }
  });
  return found;
}






