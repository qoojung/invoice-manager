const sinon = require('sinon');
const chai = require('chai');
const fs = require('fs');
const path = require('path');
const proxyquire = require('proxyquire').noCallThru().noPreserveCache();

const service = proxyquire.load('../../src/service/invoice.js', {
  '../model/db': {
    Invoice: sinon.spy(),
    InvoiceItem: sinon.spy(),
  },
});
/* eslint-disable import/no-dynamic-require  */
/* eslint-disable global-require */
const tests = [1, 2, 3, 4, 5].map((i) => ({
  testfile: path.join(__dirname, `./sample_receipt_${i}.txt`),
  expected: require(`./sample${i}Result`),
}));

describe('invoice test', () => {
  tests.forEach(({ testfile, expected }, index) => {
    it(`test parser case: ${index + 1}`, () => {
      const buffer = fs.readFileSync(testfile, 'utf8');
      const parseResult = service.parseInvoice(buffer);
      chai.expect(parseResult).to.deep.equal(expected);
    });
  });
});
