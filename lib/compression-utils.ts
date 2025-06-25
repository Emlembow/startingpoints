export interface CompressionOptions {
  removeStopwords?: boolean
  removePunctuation?: boolean
  removeSpaces?: boolean
  useStemming?: boolean
  stemmerType?: 'porter' | 'snowball' | 'lancaster'
}

const commonStopwords = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'been', 'being', 'by', 'for', 'from',
  'has', 'have', 'he', 'her', 'him', 'his', 'how', 'i', 'in', 'into', 'is', 'it', 
  'its', 'me', 'my', 'of', 'on', 'or', 'our', 'she', 'so', 'than', 'that', 'the',
  'their', 'them', 'then', 'there', 'these', 'they', 'this', 'those', 'to', 'too',
  'us', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'who', 'why', 'will',
  'with', 'would', 'you', 'your', 'about', 'after', 'all', 'also', 'am', 'another',
  'any', 'because', 'before', 'between', 'both', 'but', 'can', 'could', 'did', 'do',
  'does', 'each', 'few', 'had', 'here', 'if', 'just', 'like', 'make', 'many', 'may',
  'more', 'most', 'much', 'must', 'now', 'only', 'other', 'out', 'over', 'said',
  'same', 'see', 'should', 'since', 'some', 'still', 'such', 'take', 'than', 'that',
  'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'those', 'through',
  'to', 'too', 'under', 'up', 'very', 'was', 'way', 'we', 'well', 'were', 'what',
  'where', 'which', 'while', 'who', 'with', 'would', 'you', 'your'
])

function porterStemmer(word: string): string {
  // Basic Porter stemmer implementation
  word = word.toLowerCase()
  
  // Step 1: Remove common suffixes
  const suffixes = ['sses', 'ies', 'ss', 's', 'eed', 'ed', 'ing']
  for (const suffix of suffixes) {
    if (word.endsWith(suffix)) {
      switch (suffix) {
        case 'sses':
          return word.slice(0, -2)
        case 'ies':
          return word.slice(0, -2)
        case 'ss':
          return word
        case 's':
          return word.slice(0, -1)
        case 'eed':
          return word.length > 4 ? word.slice(0, -1) : word
        case 'ed':
        case 'ing':
          return word.length > 4 ? word.slice(0, -suffix.length) : word
      }
    }
  }
  
  return word
}

function removeStopwords(text: string): string {
  const words = text.split(/\s+/)
  return words
    .filter(word => {
      const lowerWord = word.toLowerCase().replace(/[^a-z]/g, '')
      return lowerWord && !commonStopwords.has(lowerWord)
    })
    .join('') // No spaces between words
}

function removePunctuation(text: string): string {
  // Remove most punctuation but keep essential ones for code/structure
  // Keep: . ( ) { } [ ] / - _ @ # $ % & * + = < > | \ ` ~
  // Remove: , ; : ' " ! ?
  return text.replace(/[,;:'"!?]/g, '')
}

function removeExtraSpaces(text: string): string {
  // For PromptPress-style compression, this just cleans up any remaining formatting
  // The main space removal happens in removeStopwords and applyStemming
  return text
    .replace(/\s+/g, '') // Remove any remaining spaces
    .replace(/\n+/g, '\n') // Keep single line breaks for some structure
    .trim()
}

function applyStemming(text: string, stemmerType: 'porter' | 'snowball' | 'lancaster' = 'porter'): string {
  const words = text.split(/\s+/)
  return words
    .map(word => {
      // Preserve code-like patterns
      if (/^[A-Z_]+$/.test(word) || /[A-Z][a-z]+[A-Z]/.test(word)) {
        return word
      }
      
      // Only stem regular words
      const cleanWord = word.replace(/[^a-zA-Z]/g, '')
      if (cleanWord) {
        switch (stemmerType) {
          case 'porter':
            return word.replace(cleanWord, porterStemmer(cleanWord))
          case 'snowball':
            // Simplified snowball stemmer
            return word.replace(cleanWord, porterStemmer(cleanWord))
          case 'lancaster':
            // More aggressive stemming
            return word.replace(cleanWord, porterStemmer(cleanWord).slice(0, -1))
          default:
            return word
        }
      }
      
      return word
    })
    .join('') // No spaces between words
}

export function compressText(text: string, options: CompressionOptions = {}): string {
  const {
    removeStopwords: doRemoveStopwords = true,
    removePunctuation: doRemovePunctuation = false,
    removeSpaces: doRemoveSpaces = true,
    useStemming = true,
    stemmerType = 'porter'
  } = options
  
  let compressed = text
  
  // Apply compression techniques in order
  if (doRemoveStopwords) {
    compressed = removeStopwords(compressed)
  }
  
  if (doRemovePunctuation) {
    compressed = removePunctuation(compressed)
  }
  
  if (useStemming) {
    compressed = applyStemming(compressed, stemmerType)
  }
  
  if (doRemoveSpaces) {
    compressed = removeExtraSpaces(compressed)
  }
  
  return compressed
}

export function calculateCompressionRatio(original: string, compressed: string): number {
  const originalLength = original.length
  const compressedLength = compressed.length
  
  if (originalLength === 0) return 0
  
  const ratio = ((originalLength - compressedLength) / originalLength) * 100
  return Math.round(ratio * 10) / 10
}

export function estimateTokenReduction(original: string, compressed: string): number {
  // Rough estimation: 1 token ≈ 4 characters
  const originalTokens = Math.ceil(original.length / 4)
  const compressedTokens = Math.ceil(compressed.length / 4)
  
  const reduction = ((originalTokens - compressedTokens) / originalTokens) * 100
  return Math.round(reduction * 10) / 10
}