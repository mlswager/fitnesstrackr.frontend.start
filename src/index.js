import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

async function fetchMyData() {
  let { data } = await axios.get('/api/routines')

  console.log(data)
}

fetchMyData()

ReactDOM.render(<h1>Hello World</h1>, document.getElementById('app'))
