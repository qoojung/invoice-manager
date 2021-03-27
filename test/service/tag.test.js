const sinon = require('sinon');
const chai = require('chai');
const proxyquire = require('proxyquire').noCallThru().noPreserveCache();

const tag = {
  destroy: sinon.stub().resolves([1]),
  update: sinon.stub().resolves([1]),
  create: sinon.stub().resolves([1]),
};

const service = proxyquire.load('../../src/service/tag.js', {
  '../model/db': {
    Tag: tag,
  },
});

describe('tag service test', () => {
  it('create', async () => {
    await service.add('name', 'user');
    const arg = tag.create.getCall(0).args[0];
    chai.expect(arg).to.has.property('id').to.be.a('string');
    chai.expect(arg).to.has.property('userName', 'user');
    chai.expect(arg).to.has.property('name', 'name');
  });
  it('remove', async () => {
    await service.remove('id', 'user');
    const arg = tag.destroy.getCall(0).args[0];
    chai.expect(arg).to.has.nested.property('where.id', 'id');
    chai.expect(arg).to.has.nested.property('where.userName', 'user');
  });
  it('update', async () => {
    await service.update('id', 'user', 'name');
    const arg = tag.update.getCall(0).args;
    chai.expect(arg[1]).to.has.nested.property('where.id', 'id');
    chai.expect(arg[1]).to.has.nested.property('where.userName', 'user');
    chai.expect(arg[0]).to.has.property('name', 'name');
  });
});
