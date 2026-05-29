import { describe, it, expect } from 'vitest'
import { formatCurrency } from './currency.js'

describe('formatCurrency', () => {
  it('formats zero cents as $0.00', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })

  it('formats positive cents correctly', () => {
    expect(formatCurrency(199)).toBe('$1.99')
    expect(formatCurrency(1000)).toBe('$10.00')
  })

  it('formats negative cents correctly', () => {
    expect(formatCurrency(-199)).toBe('-$1.99')
    expect(formatCurrency(-5000)).toBe('-$50.00')
  })

  it('formats large numbers correctly', () => {
    expect(formatCurrency(1_000_000_00)).toBe('$1,000,000.00')
  })

  it('round-trips integer dollar amounts', () => {
    const cents = 12345
    const formatted = formatCurrency(cents)
    // strip currency symbol and commas, re-parse to cents
    const numeric = parseFloat(formatted.replace(/[^0-9.\-]/g, ''))
    expect(Math.round(numeric * 100)).toBe(cents)
  })

  it('respects custom currency and locale', () => {
    const result = formatCurrency(100, 'EUR', 'de-DE')
    // Should contain the euro amount with German locale formatting
    expect(result).toContain('1,00')
  })
})
