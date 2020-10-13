import translate from 'google-translate-open-api';
import './style.css'

const execute = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await translate(payload, {
        tld: "cn",
        to: "en",
      })
      const data = result.data[0]
      resolve(data)
    } catch (e) {
      reject(e.message)
    }
  })
}

const addClassName = (elem, className) => {
  return elem.classList.contains(className)
}

const component = (payload) => {
  const nodes = document.body.getElementsByTagName('div')
  const element = nodes.length ? nodes[0] : document.createElement('div')

  const className = 'translate'
  if (!addClassName(element, className)) {
    element.classList.add(className)
  }
  document.body.appendChild(element)
  execute(payload).then((res) => {
    element.innerHTML = res
    utools.copyText(res)
  }).catch((msg) => {
    element.innerHTML = msg
  })
}

utools.onPluginEnter(({code, type, payload}) => {
  component(payload)
  utools.setSubInput(({ text }) => {
    if (text.trim()) {
      component(text)
    }
  }, '输入要翻译的文字')
})

utools.onPluginOut(() => {
  utools.removeSubInput()
})
