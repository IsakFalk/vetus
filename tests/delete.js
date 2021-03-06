var assert = require('chai').assert
var fs = require('fs')
var path = require('path')
var rimraf = require('rimraf').sync

var testDirectory = path.join(__dirname, 'test-temp')

var vetus = require('./../app')({ path: testDirectory })
var framework = new require('./test-framework')

describe('Delete branch from a collection', function() {

  before(function(done) {
    if (fs.existsSync(testDirectory)) {
      rimraf(testDirectory)
    }

    fs.mkdirSync(testDirectory)

    var devobj

    var data1 = {
      first: { name: 'first' },
    }

    var data2 = {
      first: { name: 'first', other: 'some' }
    }

    framework.collection({name: 'test'})
      .then(c => framework.save(c, data1))
      .then(c => framework.createBranch(c, 'dev'))
      .then(c => framework.save(c, data2))
      .then(c => framework.collection({name: 'test'}))
      .then(c => framework.save(c, data1))
      .then(c => framework.deleteBranch(c, 'dev'))
      .then(c => done())
  })

  after(function() {
    rimraf(testDirectory)
  })

  it('Branch deleted', function(done) {
    assert(typeof(devobj) === undefined)
    done()
  })
})
