import tpLocalStorage from '@/store/cache/local-storage/index.js'

class ResModel {
  constructor(data, message) {
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

class SuccessModel extends ResModel {
  constructor(data, message) {
    super(data, message)
    this.code = 1
    if (!message) {
      this.message = 'success'
    }
  }
}

class ErrorModel extends ResModel {
  constructor(data, message) {
    super(data, message)
    this.code = 0
    if (!message) {
      this.message = 'error'
    }
  }
}

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

if (!tpLocalStorage.get('list')) {
  tpLocalStorage.set('list', list)
}

export function getNumberList() {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      const data = tpLocalStorage.get('list')
      resolve(new SuccessModel(data))
    }, 20)
  })
}

export function getNumberDetail(id) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      const list = tpLocalStorage.get('list')
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        /* eslint eqeqeq: 'off' */
        if (item.id == id) {
          const data = item
          resolve(new SuccessModel(data))
          return
        }
      }
      resolve(new ErrorModel())
    }, 20)
  })
}

export function updateNumberDetail(id, text) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      const list = tpLocalStorage.get('list')
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        /* eslint eqeqeq: 'off' */
        if (item.id == id) {
          item.text = text
          tpLocalStorage.set('list', list)
          const data = item
          resolve(new SuccessModel(data))
          return
        }
      }
      resolve(new ErrorModel())
    }, 20)
  })
}

export function getLetterList(id) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      const list = tpLocalStorage.get('list')
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        /* eslint eqeqeq: 'off' */
        if (item.id == id) {
          const data = item.children
          resolve(new SuccessModel(data))
          return
        }
      }
      resolve(new ErrorModel())
    }, 20)
  })
}

export function getLetterDetail(numberId, letterId) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      const list = tpLocalStorage.get('list')
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        /* eslint eqeqeq: 'off' */
        if (item.id == numberId) {
          const letterList = item.children
          for (let i = 0; i < letterList.length; i++) {
            let letterItem = letterList[i]
            /* eslint eqeqeq: 'off' */
            if (letterItem.id == letterId) {
              const data = letterItem
              resolve(new SuccessModel(data))
              return
            }
          }
        }
      }
      resolve(new ErrorModel())
    }, 20)
  })
}

export function updateLetterDetail(numberId, letterId, text) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      const list = tpLocalStorage.get('list')
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        /* eslint eqeqeq: 'off' */
        if (item.id == numberId) {
          const letterList = item.children
          for (let i = 0; i < letterList.length; i++) {
            let letterItem = letterList[i]
            /* eslint eqeqeq: 'off' */
            if (letterItem.id == letterId) {
              letterItem.text = text
              tpLocalStorage.set('list', list)
              const data = item
              resolve(new SuccessModel(data))
              return
            }
          }
        }
      }
      resolve(new ErrorModel())
    }, 20)
  })
}

export function deleteLetterDetail(numberId, letterId) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      const list = tpLocalStorage.get('list')
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        /* eslint eqeqeq: 'off' */
        if (item.id == numberId) {
          const letterList = item.children
          if (letterList) {
            let index
            for (let i = 0; i < letterList.length; i++) {
              let letterItem = letterList[i]
              /* eslint eqeqeq: 'off' */
              if (letterItem.id == letterId) {
                index = i
                break
              }
            }
            if (index) {
              const removeItem = letterList.splice(index, 1)
              tpLocalStorage.set('list', list)
              const data = removeItem
              resolve(new SuccessModel(data))
              return
            }
          }
        }
      }
      resolve(new ErrorModel())
    }, 20)
  })
}
