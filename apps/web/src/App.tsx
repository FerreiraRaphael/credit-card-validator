import { FormEvent } from 'react'
import cx from 'classnames'
import { useIsValid } from '../api/apiComponents'
import './App.css'

const Messages = {
  'error': 'Unexpected error.',
  'invalidInput': 'Credit card input invalid.',
  'invalidCC': 'Credit card is invalid.',
  'validCC': 'Credit card is valid.',
} as const

function App() {
  const { data, error, mutate, isPending } = useIsValid()
  const isInvalidInput = error?.status === 400
  const isValidCreditCard = !error && data === true
  const showMessage = data !== undefined || error !== null
  const getMessage = () => {
    if (isInvalidInput) {
      return Messages['invalidInput']
    }
    if (error) {
      return Messages['error']
    }
    if (!isValidCreditCard) {
      return Messages['invalidCC']
    }
    return Messages['validCC']
  }
  return (
    <div>
      <h3>Check if your credit card is valid</h3>
      <form onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const ccnInput = event.currentTarget.elements.namedItem('ccn') as HTMLInputElement
        const input = ccnInput.value

        mutate({ body: { creditCard: input } })
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
            disabled={isPending}
            required />
          {showMessage && <p className={cx({
            'error': !!error,
            'warning': !error && !isValidCreditCard,
            'success': !error && isValidCreditCard,
          })}>{getMessage()}</p>}
        </label>

        <button disabled={isPending}>{isPending ? 'Loading' : 'Submit'}</button>
      </form>
    </div>
  )
}

export default App
