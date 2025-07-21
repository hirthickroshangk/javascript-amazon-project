import formatCurrency from "../../scripts/utils/money.js";

console.log('test suite: formatCurrency');

console.log('converts cents into dollars');
if ((formatCurrency(2606)) === '26.06') {
  console.log('passed test');
} else {
  console.log('failed');
  console.log(formatCurrency(2606));
}

console.log('works with zero');
if ((formatCurrency(0)) === '0.00') {
  console.log('passed test');
} else {
  console.log('failed');

}
console.log('rounds up to the nearest cent');
if ((formatCurrency(2000.5)) === '20.01') {
  console.log('passed test');
} else {
  console.log('failed');

}




