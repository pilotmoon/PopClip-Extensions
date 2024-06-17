import * as utils from './index'
Object.keys(utils).forEach(function (key) {
  const f = (utils as any)[key]
  if (typeof (f.test) === 'function') {
    print('* testing', f.name)
    f.test()
  }
})
