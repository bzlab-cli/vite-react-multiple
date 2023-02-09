import { useState } from 'react'

export default function NameForm({ onSubmit }) {
  const [value, setValue] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = event => {
    setValue(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (typeof onSubmit === 'function') onSubmit(value, password)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        username:
        <input type="text" value={value} onChange={handleChange} />
      </label>
      <br />
      <label>
        password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <p style={{ textAlign: 'center' }}>
        <input type="submit" value="Submit" />
      </p>
    </form>
  )
}
