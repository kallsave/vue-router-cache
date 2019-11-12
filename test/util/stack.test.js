import { Stack, MapStack } from '../../src/util/stack'

describe('test Stack pop', () => {
  const stack = new Stack(4)
  stack.pop(1, 2, 3, 1)
  it('stack exec pop', () => {
    expect(stack.getStore()).toEqual([1, 3, 2, 1])
  })
  it('stack is full and exec pop', () => {
    const removeList = stack.pop(4)
    expect(removeList).toEqual([1])
    expect(stack.getStore()).toEqual([4, 1, 3, 2])
  })
})

describe('test Stack shift', () => {
  const stack = new Stack()
  stack.pop(1)
  it('stack exec shift', () => {
    const removeItem = stack.shift()
    expect(removeItem).toBe(1)
    expect(stack.getStore()).toEqual([])
  })
  it('stack is empty and exec shift', () => {
    const removeItem = stack.shift()
    expect(removeItem).toBe(null)
    expect(stack.getStore()).toEqual([])
  })
})

describe('test Stack remove', () => {
  const stack = new Stack()
  stack.pop(1, 2, 3, 4)
  it('stack exec remove', () => {
    const removeList = stack.remove(2, 4)
    expect(removeList).toEqual([2, 4])
    expect(stack.getStore()).toEqual([3, 1])
  })
  it('stack not found item and exec remove', () => {
    const removeList = stack.remove(100)
    expect(removeList).toEqual([])
    expect(stack.getStore()).toEqual([3, 1])
  })
})

describe('test Stack removeByIndex', () => {
  const stack = new Stack()
  stack.pop(1, 2, 3, 4, 5)
  it('stack exec removeByIndex', () => {
    const removeItem = stack.removeByIndex(2)
    expect(removeItem).toBe(3)
    expect(stack.getStore()).toEqual([5, 4, 2, 1])
  })
  it('stack not found index and exec removeByIndex', () => {
    const removeItem = stack.removeByIndex(100)
    expect(removeItem).toBe(null)
    expect(stack.getStore()).toEqual([5, 4, 2, 1])
  })
})

describe('test Stack removeUntil', () => {
  const stack = new Stack()
  stack.pop(1, 2, 3, 4, 5)
  it('stack exec removeUntil', () => {
    const removeList = stack.removeUntil(2)
    expect(removeList).toEqual([5, 4, 3])
    expect(stack.getStore()).toEqual([2, 1])
  })
  it('stack not found index', () => {
    const removeList = stack.removeUntil(0)
    expect(removeList).toEqual([2, 1])
    expect(stack.getStore()).toEqual([])
  })
})

describe('test Stack removeExclude', () => {
  const stack = new Stack()
  stack.pop(1, 2, 3, 4, 5)
  it('stack exec removeExclude', () => {
    const removeList = stack.removeExclude(1, 5)
    expect(removeList).toEqual([4, 3, 2])
    expect(stack.getStore()).toEqual([5, 1])
  })
  it('stack not found item and exec removeExclude', () => {
    const removeList = stack.removeExclude(0)
    expect(removeList).toEqual([5, 1])
    expect(stack.getStore()).toEqual([])
  })
})

describe('test Stack removeBackByIndex', () => {
  const stack = new Stack()
  stack.pop(1, 2, 3, 4, 5)
  it('stack exec removeBackByIndex', () => {
    const removeList = stack.removeBackByIndex(3)
    expect(removeList).toEqual([5, 4, 3])
    expect(stack.getStore()).toEqual([2, 1])
  })
  it('stack not found index and exec removeBackByIndex', () => {
    const removeList = stack.removeBackByIndex(100)
    expect(removeList).toEqual([2, 1])
    expect(stack.getStore()).toEqual([])
  })
})

describe('test Stack removeBackInclue', () => {
  const stack = new Stack()
  stack.pop(1, 2, 3, 4, 5)
  it('stack exec removeBackInclue', () => {
    const removeList = stack.removeBackInclue(3)
    expect(removeList).toEqual([5, 4, 3])
    expect(stack.getStore()).toEqual([2, 1])
  })
  it('stack not found item exec removeBackInclue', () => {
    const removeList = stack.removeBackInclue(100)
    expect(removeList).toEqual([2, 1])
    expect(stack.getStore()).toEqual([])
  })
})

describe('test Stack removeAll', () => {
  const stack = new Stack()
  stack.pop(1, 2, 3)
  it('stack exec removeAll', () => {
    const removeList = stack.removeAll()
    expect(removeList).toEqual([3, 2, 1])
    expect(stack.getStore()).toEqual([])
  })
})

describe('test Stack replace', () => {
  const stack = new Stack()
  stack.pop(1, 2, 3)
  it('stack exec replace', () => {
    const removeItem = stack.replace(4)
    expect(removeItem).toEqual(3)
    expect(stack.getStore()).toEqual([4, 2, 1])
  })
})

describe('test MapStack pop', () => {
  it('mapStack exec pop', () => {
    const mapStack = new MapStack()
    const removeList = mapStack.pop(1, 2, 3, 1, 4)
    expect(mapStack.getStore()).toEqual([4, 1, 3, 2])
  })
})
