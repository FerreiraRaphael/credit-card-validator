import { FormEvent } from 'react'
import './App.css'

function App() {

  return (
    <div>
      <h3>Check if your credit card is valid</h3>
      <form onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const cnnInput = event.currentTarget.elements.namedItem('ccn') as HTMLInputElement
        console.log(cnnInput)
      }}>
        <label htmlFor="ccn">
          Credit Card Number:
          <input
            id="ccn"
            type="tel"
            inputMode="numeric"
            pattern="[0-9\s]{13,19}"
            autoComplete="cc-number"
            maxLength={19}
            placeholder="xxxx xxxx xxxx xxxx"
            name="ccn"
            required />
          <p>hello</p>
        </label>

        <button>Submit</button>
      </form>
    </div>
  )
}

export default App
