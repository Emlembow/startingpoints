import { compressText, calculateCompressionRatio, estimateTokenReduction } from './compression-utils'

describe('compression-utils', () => {
  describe('compressText', () => {
    it('should remove stopwords', () => {
      const input = 'This is a test of the compression system'
      const output = compressText(input, { removeStopwords: true, useStemming: false })
      
      expect(output).not.toContain(' is ')
      expect(output).not.toContain(' a ')
      expect(output).not.toContain(' the ')
      expect(output).toContain('test')
      expect(output).toContain('compression')
    })

    it('should apply stemming', () => {
      const input = 'testing tested tests'
      const output = compressText(input, { useStemming: true, stemmerType: 'porter' })
      
      // All should be reduced to similar stems
      expect(output).toMatch(/test\s+test\s+test/)
    })

    it('should remove extra spaces', () => {
      const input = 'too    many     spaces   here'
      const output = compressText(input, { removeSpaces: true })
      
      expect(output).toBe('too many spaces here')
    })

    it('should preserve code-like patterns', () => {
      const input = 'const API_KEY = process.env.API_KEY'
      const output = compressText(input)
      
      expect(output).toContain('API_KEY')
      expect(output).toContain('process.env.API_KEY')
    })
  })

  describe('calculateCompressionRatio', () => {
    it('should calculate correct compression ratio', () => {
      const original = 'This is a very long text with many words'
      const compressed = 'long text many words'
      
      const ratio = calculateCompressionRatio(original, compressed)
      expect(ratio).toBeGreaterThan(40)
      expect(ratio).toBeLessThan(60)
    })
  })

  describe('estimateTokenReduction', () => {
    it('should estimate token reduction', () => {
      const original = 'This is a very long text with many words that needs compression'
      const compressed = 'long text many word need compress'
      
      const reduction = estimateTokenReduction(original, compressed)
      expect(reduction).toBeGreaterThan(30)
      expect(reduction).toBeLessThan(60)
    })
  })
})