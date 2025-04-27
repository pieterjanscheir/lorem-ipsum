import { IpsumTypes } from '@/constants/ipsum-types'
import { IpsumType, WordCategory } from '@/types'

export const generateSentence = (type: IpsumType, complexity: number = 2): string => {
	if (Object.keys(IpsumTypes).length === 0) {
		return 'Please define your ipsum types.'
	}

	const ipsum = IpsumTypes[type]
	const words: string[] = []

	for (let i = 0; i < complexity + 3; i++) {
		const rand = Math.random()
		let wordType: WordCategory = 'nouns'

		if (rand < 0.4) wordType = 'nouns'
		else if (rand < 0.7) wordType = 'adjectives'
		else if (rand < 0.85) wordType = 'verbs'
		else wordType = 'descriptors'

		const selectedWords = ipsum[wordType]
		words.push(selectedWords[Math.floor(Math.random() * selectedWords.length)])
	}

	if (Math.random() < 0.3) {
		const descriptorIndex = Math.floor(Math.random() * ipsum.descriptors.length)
		words.splice(Math.floor(Math.random() * words.length), 0, ipsum.descriptors[descriptorIndex])
	}

	words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)

	return words.join(' ') + '.'
}
