import axios from 'axios'
import superagent = require('superagent')

const starIcon = `svg:
<svg enable-background="new 0 0 510 510" version="1.1" viewBox="0 0 510 510" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
<polygon points="255 402.21 412.59 497.25 370.9 318.01 510 197.47 326.63 181.74 255 12.75 183.37 181.74 0 197.47 139.1 318.01 97.41 497.25"/>
</svg>
`
defineExtension({
  icon: starIcon,
  name: {
    en: 'Test the JS plz',
    fr: 'Test SVP',
    pt: 'test pt',
    'pt-BR': 'test BRAZIL',
    'en-GB': 'alright guvna',
    'zh-Hans': '你好'
  },
  // options: [
  //   {
  //     identifier: 'test',
  //     type: 'boolean',
  //     label: 'useless'
  //   }
  // ],
  actions: [
    {
      title: 'Data',
      icon: '((D))',
      code (selection) {
        print(selection.data)
        print(selection.data.paths)
        print(selection.data.paths.ranges)
      }
    },
    {
      title: 'RTF',
      icon: 'RTF',
      flags: { captureRtf: true },
      code (selection) {
        print(selection.rtf)
      }
    }, {
      title: 'Show Success',
      icon: 'symbol:checkmark',
      code () {
        popclip.showSuccess()
      }
    }, {
      title: 'Show Success Async',
      icon: 'symbol:checkmark.circle',
      code () {
        setTimeout(() => {
          popclip.showSuccess()
        }, 1000)
      }
    }, {
      title: 'Timer 5s',
      icon: 'text:(5s)',
      code (selection) {
        setTimeout(() => {
          print('5s timer fired')
          return 'my string 456'
        }, 5000)
      },
      after: 'show-result'
    }, {
      title: 'Interval',
      icon: '(int)',
      code (selection) {
        setInterval(() => {
          print('100ms timer fired')
        }, 1)
      },
      after: 'show-result'
    }, {
      title: 'HTTP',
      icon: 'symbol:hand.raised',
      async code (selection) {
        print((await axios.get('http://sabnzbd.org/tests/internetspeed/10MB.bin')).statusText)
      }
    }, {
      title: 'Large File',
      icon: 'symbol:bus.fill',
      async code (selection) {
        popclip.showText((await axios.get('https://sabnzbd.org/tests/internetspeed/10MB.bin')).statusText)
      }
    }, {
      title: 'Large File with timeout',
      icon: 'symbol:clock',
      async code (selection) {
        // https://stackoverflow.com/questions/100841/artificially-create-a-connection-timeout-error
        popclip.showText((await axios.get('https://10.255.255.1/')).statusText)
      }
    }, {
      title: 'Example.com',
      icon: 'symbol:seal',
      async code (selection) {
        print((await axios.get('https://example.com/')).statusText)
      }
    }, {
      title: 'Example.com 404',
      icon: 'symbol:nosign',
      async code (selection) {
        print((await axios.get('https://example.com/sdkfjhdkjf')).statusText)
      }
    }, {
      title: '301 Redirect',
      icon: 'symbol:arrowshape.bounce.right',
      async code (selection) {
        print((await axios.get('https://pilotmoon.com/link/popclip')).statusText)
      }
    }, {
      title: 'JSON',
      icon: 'symbol:number',
      async code (selection) {
        print((await axios.get('https://dog.ceo/api/breeds/image/random')).statusText)
      }
    }, {
      title: 'Settings',
      icon: 'symbol:gear',
      code (selection) {
        popclip.showSettings()
      }
    }, {
      title: 'POST JSON',
      icon: 'symbol:signpost.right',
      async code (selection) {
        const info = {
          name: 'zzzzz',
          job: 'ZZ66'
        }
        print((await axios.post('https://reqres.in/api/users', info)).statusText)
      }
    }, {
      title: 'POST superagent',
      icon: 'symbol:signpost.left',
      async code (selection) {
        const info = {
          name: 'yyyyy',
          job: 'QY77'
        }
        const res = await superagent.post('https://reqres.in/api/users').send(info)
        print(res)
        print({ myFunc: () => {} })
      }
    }
  ]
})

// var xhr = new XMLHttpRequest()
// xhr.onreadystatechange = function handleLoad () {
//   if (!this.xhr || this.xhr.readyState !== 4) {
//     return
//   }
//   print(this.xhr.responseText)
//   //xhr = null
// }
// xhr.open('GET', 'https://www.example.org/example.txt')
// xhr.send()

// superagent
//   .get('https://xkcd.com/')
//   .end((err, res) => {
//     if (err) {
//       print('errrorrrr')
//     } else {
//       //print(res.text)
//       print('gotit')
//     }
//   })

// promise with async/await
// (async () => {
//   try {
//     const res = await superagent.get('https://xkcd.com/')
//     print(res)
//   } catch (err) {
//     print(err)
//   }
// })().catch(error => {
//   print('onrs', error)
// })c

// (async () => {
//   try {
//     const response = await axios.get('https://sabnzbd.org/tests/internetspeed/50MB.bin')
//     print(response.request.status)
//   } catch (err) {
//     print(err)
//   }
// })().catch(error => {
//   print('onra', error)
// })

// http().then(value => {
//   print('ok', value)
// }, error => {
//   print('error', error)
// })

// let hello = require('hello');
// let cj = require('./Config.json');
// let turndown = require('turndown');

// const to = 5000
// print('setting timeout', to)
// const id = setTimeout(() => {
//   print('second')
// }, to)
// setTimeout(() => {
//   print('first')
// }, 2000)
// }
