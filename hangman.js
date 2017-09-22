function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}


const Hangman = (containerName) => {
  const containerElement = document.querySelector(containerName)
  const state = {
    id: null,
    triesLeft: null,
    lastInput: '',
    history: [],
    numCharacters: null,
    fetching: false,
  }

  function callApi(endpoint, payload) {
    let url = 'https://hangman.coursera.org'
    // const options = {
    //   method: 'POST',
    //   headers: { 'Content-type': 'application/json' },
    // }

    if (endpoint === 'start') {
      url = `${url}/hangman/game`
      // options.body = JSON.stringify(payload)
    }
    if (endpoint === 'try') {
      url = `${url}/hangman/game/${payload}`
    }

    return $.ajax({
      method: 'POST',
      url: url,
      data: JSON.stringify(payload),
      success: function(response) {
        return response
      },
    })
    // fetch(url, options)
    //   .then(res => res.json())
    //   .then(data => console.log(data))
    //   .catch(err => console.log)
  }


  return {
    start() {
      const form = containerElement.querySelector(`${containerName}__connection`)
      form.addEventListener('submit', (event) => {
        event.preventDefault()
        callApi('start', { email: form.elements.email.value })
      })
    }
  }
}


ready(() => {
  // const el = document.querySelector()
  const hangman = Hangman('.Hangman')
  hangman.start()
})
