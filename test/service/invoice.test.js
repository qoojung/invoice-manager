const sinon = require('sinon');
const chai = require('chai');
const proxyquire = require('proxyquire').noCallThru().noPreserveCache();

const service = proxyquire.load('../../src/service/invoice.js', {
  '../model/db': {
    Invoice: sinon.spy(),
    InvoiceItem: sinon.spy(),
  },
});
const testcase1 = `Bob's Store
Tel :0123456789
GST Reg.:0123456789

Date:30.04.2020  Time:11:46:40
Receipt ID:100792   
+----------------------------------------------+
8887347100219 Sunflower Dried Red Dates 60g
1 x 1.20                                    1.20
8887347100165 Sunflower Black Beans 250g
1 x 2.90                                    2.90
8888140031045 Mili Fried Dace Fish 184g
2 x 2.40                                    4.80
8885008269060 El-Dina Halal Luncheon Original 340g
1 x 3.50                                    3.50

CASH          SubTotal:                    12.40
ITEMS(4)  QTY(5)
------------------------
Total :            12.40
------------------------
INCLUSIVE 7% GST 0.81
--- Thank You & Have A Nice Day ---`;
const testcase2 = `Bob's Store
Tel :0123456789
GST Reg.:0123456789

Date:05.04.2020  Time:08:48:04
Receipt ID:87450   
+----------------------------------------------+
88823027 Viceroy Menthol Super
4 x 11.70                                  46.80
7622210400291 Daily Milk Roast Almond
1 x 3.80                                    3.80

CASH          SubTotal:                    50.60
ITEMS(2)  QTY(5)
------------------------
Total :            50.60
------------------------
INCLUSIVE 7% GST 3.31
--- Thank You & Have A Nice Day ---
`;
const expect = [
  {
    shopName: "Bob's Store",
    tel: '0123456789',
    shopDate: new Date('2020-05-30T03:46:40.000Z'),
    items: [
      {
        name: '8887347100219 Sunflower Dried Red Dates 60g',
        price: 1.2,
        quantity: 1,
      },
      {
        name: '8887347100165 Sunflower Black Beans 250g',
        price: 2.9,
        quantity: 1,
      },
      {
        name: '8888140031045 Mili Fried Dace Fish 184g',
        price: 2.4,
        quantity: 2,
      },
      {
        name: '8885008269060 El-Dina Halal Luncheon Original 340g',
        price: 3.5,
        quantity: 1,
      },
    ],
    total: 12.4,
  },
  {
    shopName: "Bob's Store",
    shopDate: new Date('2020-05-05T00:48:04.000Z'),
    tel: '0123456789',
    items: [
      {
        name: '88823027 Viceroy Menthol Super',
        price: 11.7,
        quantity: 4,
      },
      {
        name: '7622210400291 Daily Milk Roast Almond',
        price: 3.8,
        quantity: 1,
      },
    ],
    total: 50.6,
  },
];
describe('invoice test', () => {
  const tests = [
    { testfile: testcase1, expected: expect[0] },
    { testfile: testcase2, expected: expect[1] },
  ];

  tests.forEach(({ testfile, expected }, index) => {
    it(`test parser case: ${index}`, () => {
      const buffer = Buffer.from(testfile, 'utf-8');
      const parseResult = service.parseInvoice(buffer);
      chai.expect(parseResult).to.deep.equal(expected);
    });
  });
});
