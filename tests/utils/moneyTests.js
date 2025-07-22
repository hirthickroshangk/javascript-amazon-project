import formatCurrency from "../../scripts/utils/money.js";

describe('test suite: formatCurreny', () => {
  it('convert cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });
  it('works with zero', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });
  it('rounds up to the nearest cent', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });
  it('works with negative number', () => {
    expect(formatCurrency(-200.3)).toEqual('-2.00');
  });
  
});
