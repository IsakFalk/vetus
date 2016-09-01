var assert = require('./assert')
var historyGenerator = require('./../src/history-generator')

describe('When generating history', function() {

  var objects = [
    {
      add: [],
      create: [],
      recursive: [{ name: 'first' }],
      $commit: {
        author: 'rob',
        date: '2/2/12'
      }
    },
    {
      add: [{ id: '1' }],
      recursive: [{ name: 'second' }],
      $commit: {
        author: 'jamie',
        date: '3/3/13'
      }
    },
  ]

  var history = historyGenerator(objects)

  it('contains array add', function() {
    console.log(history)
    assert(history.add)
  })

  it('contains array create', function() {
    assert(history.create)
  })

  it('Array history item added', function() {
    assert(history.$hist_add === 'Updated by jamie at 3/3/13')
  })

  it('Array history item created', function() {
    assert(history.$hist_create === 'Created by rob at 2/2/12')
  })

  it('latest value shown', function() {
    assert(history.add.length === 1)
  })

  it('Adds added commit', function() {
    assert(history.add[0]['$hist_arr'] === 'Updated by jamie at 3/3/13')
  })

  it('Processes array items recursively', function() {
    assert.value(history.recursive[0].name, 'second', 'Name property')
  })

  it('Adds history recursively for array items', function() {
    assert.value(history.recursive[0]['$hist_name'], 'Modified by jamie at 3/3/13', 'Recursive history')
  })

  it('Reordered array items handled correctly', function() {
    assert(false)
  })

  it('Deleted array items handled correctly', function() {
    assert(false)
  })

  it('Id working properly', function() {
    assert(false)
  })

  // Reordered array items
  // deleted array items
  // New item with id
})