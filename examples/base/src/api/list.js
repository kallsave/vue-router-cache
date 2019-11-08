import { deepClone } from '@/common/helpers/utils.js'

const list = [
  {
    id: 0,
    text: 0,
    background: '#ff5555',
    children: [
      {
        id: 0,
        text: 'a',
        background: '#ff5555',
      },
      {
        id: 1,
        text: 'b',
        background: '#a393eb',
      },
      {
        id: 2,
        text: 'c',
        background: '#fc5c9c',
      },
      {
        id: 3,
        text: 'd',
        background: '#90f2ff',
      },
      {
        id: 4,
        text: 'e',
        background: '#3d84a8',
      },
      {
        id: 5,
        text: 'f',
        background: '#46cdcf',
      },
      {
        id: 6,
        text: 'g',
        background: '#00b8a9',
      },
      {
        id: 7,
        text: 'h',
        background: '#8ef6e4',
      },
      {
        id: 8,
        text: 'i',
        background: '#9896f1',
      },
    ]
  },
  {
    id: 1,
    text: 1,
    background: '#a393eb',
    children: [
      {
        id: 0,
        text: 'a',
        background: '#ff5555',
      },
      {
        id: 1,
        text: 'b',
        background: '#a393eb',
      },
      {
        id: 2,
        text: 'c',
        background: '#fc5c9c',
      },
      {
        id: 3,
        text: 'd',
        background: '#90f2ff',
      },
      {
        id: 4,
        text: 'e',
        background: '#3d84a8',
      },
      {
        id: 5,
        text: 'f',
        background: '#46cdcf',
      },
      {
        id: 6,
        text: 'g',
        background: '#00b8a9',
      },
      {
        id: 7,
        text: 'h',
        background: '#8ef6e4',
      },
      {
        id: 8,
        text: 'i',
        background: '#9896f1',
      },
    ]
  },
  {
    id: 2,
    text: 2,
    background: '#fc5c9c',
    children: [
      {
        id: 0,
        text: 'a',
        background: '#ff5555',
      },
      {
        id: 1,
        text: 'b',
        background: '#a393eb',
      },
      {
        id: 2,
        text: 'c',
        background: '#fc5c9c',
      },
      {
        id: 3,
        text: 'd',
        background: '#90f2ff',
      },
      {
        id: 4,
        text: 'e',
        background: '#3d84a8',
      },
      {
        id: 5,
        text: 'f',
        background: '#46cdcf',
      },
      {
        id: 6,
        text: 'g',
        background: '#00b8a9',
      },
      {
        id: 7,
        text: 'h',
        background: '#8ef6e4',
      },
      {
        id: 8,
        text: 'i',
        background: '#9896f1',
      },
    ]
  },
  {
    id: 3,
    text: 3,
    background: '#90f2ff',
    children: [
      {
        id: 0,
        text: 'a',
        background: '#ff5555',
      },
      {
        id: 1,
        text: 'b',
        background: '#a393eb',
      },
      {
        id: 2,
        text: 'c',
        background: '#fc5c9c',
      },
      {
        id: 3,
        text: 'd',
        background: '#90f2ff',
      },
      {
        id: 4,
        text: 'e',
        background: '#3d84a8',
      },
      {
        id: 5,
        text: 'f',
        background: '#46cdcf',
      },
      {
        id: 6,
        text: 'g',
        background: '#00b8a9',
      },
      {
        id: 7,
        text: 'h',
        background: '#8ef6e4',
      },
      {
        id: 8,
        text: 'i',
        background: '#9896f1',
      },
    ]
  },
  {
    id: 4,
    text: 4,
    background: '#3d84a8',
    children: [
      {
        id: 0,
        text: 'a',
        background: '#ff5555',
      },
      {
        id: 1,
        text: 'b',
        background: '#a393eb',
      },
      {
        id: 2,
        text: 'c',
        background: '#fc5c9c',
      },
      {
        id: 3,
        text: 'd',
        background: '#90f2ff',
      },
      {
        id: 4,
        text: 'e',
        background: '#3d84a8',
      },
      {
        id: 5,
        text: 'f',
        background: '#46cdcf',
      },
      {
        id: 6,
        text: 'g',
        background: '#00b8a9',
      },
      {
        id: 7,
        text: 'h',
        background: '#8ef6e4',
      },
      {
        id: 8,
        text: 'i',
        background: '#9896f1',
      },
    ]
  },
  {
    id: 5,
    text: 5,
    background: '#46cdcf',
    children: [
      {
        id: 0,
        text: 'a',
        background: '#ff5555',
      },
      {
        id: 1,
        text: 'b',
        background: '#a393eb',
      },
      {
        id: 2,
        text: 'c',
        background: '#fc5c9c',
      },
      {
        id: 3,
        text: 'd',
        background: '#90f2ff',
      },
      {
        id: 4,
        text: 'e',
        background: '#3d84a8',
      },
      {
        id: 5,
        text: 'f',
        background: '#46cdcf',
      },
      {
        id: 6,
        text: 'g',
        background: '#00b8a9',
      },
      {
        id: 7,
        text: 'h',
        background: '#8ef6e4',
      },
      {
        id: 8,
        text: 'i',
        background: '#9896f1',
      },
    ]
  },
  {
    id: 6,
    text: 6,
    background: '#00b8a9',
    children: [
      {
        id: 0,
        text: 'a',
        background: '#ff5555',
      },
      {
        id: 1,
        text: 'b',
        background: '#a393eb',
      },
      {
        id: 2,
        text: 'c',
        background: '#fc5c9c',
      },
      {
        id: 3,
        text: 'd',
        background: '#90f2ff',
      },
      {
        id: 4,
        text: 'e',
        background: '#3d84a8',
      },
      {
        id: 5,
        text: 'f',
        background: '#46cdcf',
      },
      {
        id: 6,
        text: 'g',
        background: '#00b8a9',
      },
      {
        id: 7,
        text: 'h',
        background: '#8ef6e4',
      },
      {
        id: 8,
        text: 'i',
        background: '#9896f1',
      },
    ]
  },
  {
    id: 7,
    text: 7,
    background: '#8ef6e4',
    children: [
      {
        id: 0,
        text: 'a',
        background: '#ff5555',
      },
      {
        id: 1,
        text: 'b',
        background: '#a393eb',
      },
      {
        id: 2,
        text: 'c',
        background: '#fc5c9c',
      },
      {
        id: 3,
        text: 'd',
        background: '#90f2ff',
      },
      {
        id: 4,
        text: 'e',
        background: '#3d84a8',
      },
      {
        id: 5,
        text: 'f',
        background: '#46cdcf',
      },
      {
        id: 6,
        text: 'g',
        background: '#00b8a9',
      },
      {
        id: 7,
        text: 'h',
        background: '#8ef6e4',
      },
      {
        id: 8,
        text: 'i',
        background: '#9896f1',
      },
    ]
  },
  {
    id: 8,
    text: 8,
    background: '#9896f1',
    children: [
      {
        id: 0,
        text: 'a',
        background: '#ff5555',
      },
      {
        id: 1,
        text: 'b',
        background: '#a393eb',
      },
      {
        id: 2,
        text: 'c',
        background: '#fc5c9c',
      },
      {
        id: 3,
        text: 'd',
        background: '#90f2ff',
      },
      {
        id: 4,
        text: 'e',
        background: '#3d84a8',
      },
      {
        id: 5,
        text: 'f',
        background: '#46cdcf',
      },
      {
        id: 6,
        text: 'g',
        background: '#00b8a9',
      },
      {
        id: 7,
        text: 'h',
        background: '#8ef6e4',
      },
      {
        id: 8,
        text: 'i',
        background: '#9896f1',
      },
    ]
  },
]

export function getNumberList() {
  return deepClone([], list)
}

export function getNumberDetail(id) {
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    /* eslint eqeqeq: 'off' */
    if (item.id == id) {
      return deepClone({}, item)
    }
  }
  return {}
}

export function updateNumberDetail(id, text) {
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    /* eslint eqeqeq: 'off' */
    if (item.id == id) {
      item.text = text
      return true
    }
  }
  return false
}

export function getLetterList(id, mode = false) {
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    /* eslint eqeqeq: 'off' */
    if (item.id == id) {
      if (mode) {
        return item.children
      } else {
        return deepClone([], item.children)
      }
    }
  }
  return []
}

export function getLetterDetail(numberId, letterId) {
  let letterList = getLetterList(numberId)
  if (letterList) {
    for (let i = 0; i < letterList.length; i++) {
      let item = letterList[i]
      /* eslint eqeqeq: 'off' */
      if (item.id == letterId) {
        return deepClone({}, item)
      }
    }
  }
  return {}
}

export function updateLetterDetail(numberId, letterId, text) {
  let letterList = getLetterList(numberId, true)
  if (letterList) {
    for (let i = 0; i < letterList.length; i++) {
      let item = letterList[i]
      /* eslint eqeqeq: 'off' */
      if (item.id == letterId) {
        item.text = text
        return true
      }
    }
  }
  return false
}

export function deleteLetterDetail(numberId, letterId) {
  let letterList = getLetterList(numberId, true)
  if (letterList) {
    let index
    for (let i = 0; i < letterList.length; i++) {
      let item = letterList[i]
      /* eslint eqeqeq: 'off' */
      if (item.id == letterId) {
        index = i
        break
      }
    }
    if (index) {
      letterList.splice(index, 1)
      return true
    }
  }
  return false
}
