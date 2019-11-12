import tpLocalStorage from '@/store/cache/local-storage/index'

if (tpLocalStorage.get('isSingleMode') === null) {
  tpLocalStorage.set('isSingleMode', true)
}

export const isSingleMode = tpLocalStorage.get('isSingleMode')
