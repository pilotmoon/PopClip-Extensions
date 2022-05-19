import axios from '@popclip/axios'
import superagent = require('superagent')

const starIcon = `svg:
<svg enable-background="new 0 0 510 510" version="1.1" viewBox="0 0 510 510" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
<polygon points="255 402.21 412.59 497.25 370.9 318.01 510 197.47 326.63 181.74 255 12.75 183.37 181.74 0 197.47 139.1 318.01 97.41 497.25"/>
</svg>
`

const testAction: Action = {
  code: () => {
    return 'code ran'
  }
}

testAction.after = 'show-result'

// const f = popclip.input?.text
// print(f)

defineExtension({
  title: 'fallback title',
  icon: starIcon,
  name: {
    en: 'Test the JS plz',
    fr: 'Test SVP',
    pt: 'test pt',
    'pt-BR': 'test BRAZIL',
    'en-GB': 'alright guv\'na',
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
    testAction,
    {
      title: 'Data',
      icon: '((D))',
      code: (selection) => {
        print(selection.data)
        print(selection.data.paths)
        print(selection.data.paths.ranges)
        return null
      }
    },
    {
      title: 'TimeZone',
      icon: 'TZ',
      requirements: [],
      code (selection) {
        popclip.pasteText(JSON.stringify(util.timeZoneInfo))
        return null
      }
    },
    {
      title: 'Locale',
      icon: 'Loc',
      requirements: [],
      code (selection) {
        popclip.pasteText(JSON.stringify(util.localeInfo))
        return null
      }
    },
    {
      title: 'RTF',
      icon: 'RTF',
      captureRtf: true,
      code (selection) {
        print(selection.rtf)
        return null
      }
    }, {
      title: 'Show Success',
      icon: 'symbol:checkmark',
      code () {
        popclip.showSuccess()
        return null
      }
    }, {
      title: 'Show Success Async',
      icon: 'symbol:checkmark.circle',
      code () {
        setTimeout(() => {
          popclip.showSuccess()
        }, 1000)
        return null
      }
    }, {
      title: 'Timer 5s',
      icon: 'text:(5s)',
      code (selection) {
        setTimeout(() => {
          print('5s timer fired')
          return 'my string 456'
        }, 5000)
        return null
      },
      after: 'show-result'
    }, {
      title: 'Interval',
      icon: '(int)',
      code (selection) {
        setInterval(() => {
          print('100ms timer fired')
        }, 1)
        return null
      },
      after: 'show-result'
    }, {
      title: 'HTTP',
      icon: 'symbol:hand.raised',
      async code (selection) {
        print((await axios.get('http://sabnzbd.org/tests/internetspeed/10MB.bin')).statusText)
        return null
      }
    }, {
      title: 'Large File',
      icon: 'symbol:bus.fill',
      async code (selection) {
        popclip.showText((await axios.get('https://sabnzbd.org/tests/internetspeed/10MB.bin')).statusText)
        return null
      }
    }, {
      title: 'Large File with timeout',
      icon: 'symbol:clock',
      async code (selection) {
        // https://stackoverflow.com/questions/100841/artificially-create-a-connection-timeout-error
        popclip.showText((await axios.get('https://10.255.255.1/')).statusText)
        return null
      }
    }, {
      title: 'Example.com',
      icon: 'symbol:seal',
      async code (selection) {
        print((await axios.get('https://example.com/')).statusText)
        return null
      }
    }, {
      title: 'Example.com 404',
      icon: 'symbol:nosign',
      async code (selection) {
        print((await axios.get('https://example.com/sdkfjhdkjf')).statusText)
        return null
      }
    }, {
      title: '301 Redirect',
      icon: 'symbol:arrowshape.bounce.right',
      async code (selection) {
        print((await axios.get('https://pilotmoon.com/link/popclip')).statusText)
        return null
      }
    }, {
      title: 'JSON',
      icon: 'symbol:number',
      async code (selection) {
        print((await axios.get('https://dog.ceo/api/breeds/image/random')).statusText)
        return null
      }
    }, {
      title: 'Settings',
      icon: 'symbol:gear',
      code (selection) {
        popclip.showSettings()
        return null
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
        return null
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
        return null
      }
    }, {
      title: 'POST Blob',
      async code (selection) {
        const a = new Blob(['test blob'])
        print((await axios.post('https://reqres.in/api/users', a, { headers: { 'Content-Type': 'application/octet-stream' } })).statusText)
        return null
      }
    }, {
      title: 'POST ArrayBuffer',
      async code (selection) {
        const a = new Int8Array([21, 31])
        print((await axios.post('https://reqres.in/api/users', a, { headers: { 'Content-Type': 'application/octet-stream' } })).statusText)
        return null
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
//       print('error')
//     } else {
//       //print(res.text)
//       print('got it')
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
//   print('on rs', error)
// })c

// (async () => {
//   try {
//     const response = await axios.get('https://sabnzbd.org/tests/internetspeed/50MB.bin')
//     print(response.request.status)
//   } catch (err) {
//     print(err)
//   }
// })().catch(error => {
//   print('on ra', error)
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
