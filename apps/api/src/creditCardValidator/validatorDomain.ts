export class ApiError extends Error {
  public status: number
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status
  }
}

export class InvalidInput extends ApiError {
  constructor(message: string) {
    super(400, message);
    this.name = 'InvalidInput';
  }
}

function isNumber(n: string) {
  return Number.isFinite(Number(n))
}

export class ValidatorDomain {
  public isValid(creditCard: string): boolean {
    if (
      !creditCard ||
      !isNumber(creditCard) ||
      creditCard.length !== 16
    ) throw new InvalidInput("Credit card input invalid.")
    return this.luhnChecksum(creditCard) === 0
  }
  private luhnChecksum(code: string): number {
    const isPair = (n: number) => n % 2 === 0
    const size = code.length
    let sum = 0
    for (let index = size - 1; index >= 0; index--) {
      let digit = parseInt(code.charAt(index))
      if (isPair(index)) {
        digit *= 2
      }
      if (digit > 9) {
        // Example 14: 14 becomes (1 + 4 = 5),
        // so we simplify this by decreasing 9 of numbers bigger than 9.
        digit -= 9
      }
      sum += digit
    }
    return sum % 10
  }
}
