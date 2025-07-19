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

export function calculateDeliveryDate(deliveryOption) {
  const days = deliveryOption.deliveryDays;
  return dayjs().add(days,'days').format('dddd, MMMM D');
}