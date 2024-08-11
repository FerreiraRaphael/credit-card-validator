import { test, expect, describe } from 'vitest';
import { InvalidInput, ValidatorDomain } from './validatorDomain'

describe('ValidatorDomain', () => {
  describe('isValid', () => {
    describe('success cases', () => {
      test('should return true to valid inputs', () => {
        const domain = new ValidatorDomain();
        expect(domain.isValid('5011054488597827')).toBe(true)
        expect(domain.isValid('6271701225979642')).toBe(true)
        expect(domain.isValid('6034932528973614')).toBe(true)
        expect(domain.isValid('4701322211111234')).toBe(true)
        expect(domain.isValid('4347699988887777')).toBe(true)
      })
      test('should return false to invalid inputs', () => {
        const domain = new ValidatorDomain();
        expect(domain.isValid('5011034488597827')).toBe(false)
        expect(domain.isValid('6271721225979642')).toBe(false)
        expect(domain.isValid('6034912528973614')).toBe(false)
        expect(domain.isValid('4701322213111234')).toBe(false)
        expect(domain.isValid('4347629988887777')).toBe(false)
        expect(domain.isValid('1234123412341234')).toBe(false)
      })
    })
    describe('fail cases', () => {
      test('should throw InvalidInput, if empty input', () => {
        const domain = new ValidatorDomain();
        expect(() => domain.isValid('')).toThrow(InvalidInput)
        // @ts-ignore
        expect(() => domain.isValid(undefined)).toThrow(InvalidInput)
        // @ts-ignore
        expect(() => domain.isValid(null)).toThrow(InvalidInput)
      });

      test('should throw InvalidInput, if input is not a number', () => {
        const domain = new ValidatorDomain();
        expect(() => domain.isValid('1234-1234-1234-1234')).toThrow(InvalidInput)
      });

      test('should throw InvalidInput, if input length is not 16', () => {
        const domain = new ValidatorDomain();
        expect(() => domain.isValid('1')).toThrow(InvalidInput)
        expect(() => domain.isValid('123412341234123')).toThrow(InvalidInput)
      });
    })
  })
})
