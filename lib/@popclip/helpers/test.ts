import * as utils from './index'
Object.keys(utils).forEach(function (key) {
  const f = utils[key]
  if (typeof (f.test) === 'function') {
    print('* testing', f.name)
    f.test()
  }
})
