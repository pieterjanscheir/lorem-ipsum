'use client'
import { Settings2Icon, RefreshCwIcon, CopyIcon, CheckIcon, FileTextIcon } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { AdvancedSettings } from '@/components/advanced-settings'
import { IpsumTypeSelector } from '@/components/ipsum-type-selector'
import { ParagraphsControl } from '@/components/paragraphs-control'
import { IpsumTypes } from '@/constants/ipsum-types'
import { generateSentence } from '@/lib/generate-sentence'
import { IpsumType } from '@/types'
import { cn } from '@/lib/utils'

type LoremIpsumGeneratorProps = {
	className?: string
}

export const LoremIpsumGenerator = ({ className }: LoremIpsumGeneratorProps) => {
	const [type, setType] = useState<IpsumType>('CUPCAKE')
	const [paragraphs, setParagraphs] = useState(3)
	const [paragraphSizes, setParagraphSizes] = useState<number[]>(new Array(3).fill(50))
	const [sentenceComplexity, setSentenceComplexity] = useState(2)
	const [generatedText, setGeneratedText] = useState('')
	const [isAdvancedSettingsOpen, setIsAdvancedSettingsOpen] = useState(false)
	const [isCopied, setIsCopied] = useState(false)
	const [paragraphLengthMode, setParagraphLengthMode] = useState<'uniform' | 'random' | 'custom'>('uniform')
	const [uniformParagraphSize, setUniformParagraphSize] = useState(50)
	const [wordCount, setWordCount] = useState(0)

	const generateText = useCallback(() => {
		if (Object.keys(IpsumTypes).length === 0) {
			setGeneratedText('No ipsum types defined. Please add ipsum types to generate text.')
			setWordCount(0)
			return
		}

		let text = ''
		const usedSentences = new Set<string>()
		let totalWords = 0

		for (let p = 0; p < paragraphs; p++) {
			const paragraphSentences: string[] = []
			const paragraphSize = paragraphSizes[p]
			const sentencesPerParagraph = Math.ceil(paragraphSize / 10)

			while (paragraphSentences.length < sentencesPerParagraph) {
				const sentence = generateSentence(type, sentenceComplexity)

				if (!usedSentences.has(sentence)) {
					paragraphSentences.push(sentence)
					usedSentences.add(sentence)
					// Count words in this sentence
					totalWords += sentence.split(/\s+/).length
				}
			}

			text += paragraphSentences.join(' ') + '\n\n'
		}

		setGeneratedText(text.trim())
		setWordCount(totalWords)
	}, [type, paragraphs, paragraphSizes, sentenceComplexity])

	useEffect(() => {
		generateText()
	}, [generateText])

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(generatedText)
			setIsCopied(true)
			toast.success('Copied to clipboard!')

			setTimeout(() => setIsCopied(false), 2000)
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Failed to copy:', error)
			toast.error('Failed to copy to clipboard')
		}
	}

	const handleUniformParagraphSizeChange = (newSize: number) => {
		setUniformParagraphSize(newSize)
		setParagraphSizes(new Array(paragraphs).fill(newSize))
	}

	const handleRandomParagraphSizes = () => {
		const newSizes = new Array(paragraphs).fill(0).map(() => Math.floor(Math.random() * 91) + 10) // Random between 10 and 100
		setParagraphSizes(newSizes)
	}

	useEffect(() => {
		if (paragraphLengthMode === 'uniform') {
			setParagraphSizes(new Array(paragraphs).fill(uniformParagraphSize))
		} else if (paragraphLengthMode === 'random') {
			handleRandomParagraphSizes()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paragraphLengthMode, paragraphs, uniformParagraphSize])

	return (
		<TooltipProvider>
			<div className={`container mx-auto max-w-4xl space-y-6 p-4 ${className}`}>
				<Card className='border-2 border-gray-200 shadow-sm dark:border-gray-800'>
					<CardHeader className='pb-2'>
						<div className='flex items-center justify-between'>
							<div>
								<CardTitle className='text-2xl font-bold'>Ipsum Generator</CardTitle>
								<CardDescription className='text-sm text-gray-500 dark:text-gray-400'>
									Create custom lorem ipsum text with precise control
								</CardDescription>
							</div>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										aria-label='Toggle advanced settings'
										onClick={() => setIsAdvancedSettingsOpen(!isAdvancedSettingsOpen)}
										size='icon'
										variant='outline'
										className='h-9 w-9'
									>
										<Settings2Icon
											className={cn('h-5 w-5', isAdvancedSettingsOpen ? '-scale-x-100' : '')}
										/>
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									{isAdvancedSettingsOpen ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
								</TooltipContent>
							</Tooltip>
						</div>
					</CardHeader>
					<CardContent>
						<div className='space-y-6'>
							<div className='grid gap-6 md:grid-cols-2'>
								<IpsumTypeSelector
									onTypeChange={setType}
									type={type}
								/>
								<ParagraphsControl
									onParagraphSizesChange={setParagraphSizes}
									onParagraphsChange={setParagraphs}
									paragraphSizes={paragraphSizes}
									paragraphs={paragraphs}
								/>
							</div>

							{isAdvancedSettingsOpen && (
								<AdvancedSettings
									onParagraphLengthModeChange={setParagraphLengthMode}
									onParagraphSizesChange={setParagraphSizes}
									onRandomParagraphSizes={handleRandomParagraphSizes}
									onSentenceComplexityChange={setSentenceComplexity}
									onUniformParagraphSizeChange={handleUniformParagraphSizeChange}
									paragraphLengthMode={paragraphLengthMode}
									paragraphSizes={paragraphSizes}
									paragraphs={paragraphs}
									sentenceComplexity={sentenceComplexity}
									uniformParagraphSize={uniformParagraphSize}
								/>
							)}

							<div className='flex flex-col space-y-4'>
								<Button
									className='w-full'
									onClick={generateText}
								>
									<RefreshCwIcon className='mr-2 h-4 w-4' />
									Regenerate Text
								</Button>
								{generatedText && (
									<Button
										aria-label='Copy to clipboard'
										className={`w-full ${isCopied ? 'bg-green-500 hover:bg-green-600' : ''}`}
										onClick={copyToClipboard}
										variant={isCopied ? 'default' : 'secondary'}
									>
										{isCopied ? (
											<>
												<CheckIcon className='mr-2 h-4 w-4' />
												Copied to clipboard!
											</>
										) : (
											<>
												<CopyIcon className='mr-2 h-4 w-4' />
												Copy Text
											</>
										)}
									</Button>
								)}
							</div>
						</div>
					</CardContent>
				</Card>

				{generatedText && (
					<Card className='border-2 border-gray-200 shadow-sm dark:border-gray-800'>
						<CardHeader className='flex flex-row items-center justify-between pb-2'>
							<div className='flex items-center space-x-2'>
								<FileTextIcon className='h-5 w-5 text-gray-500' />
								<CardTitle className='text-xl'>Generated Text</CardTitle>
							</div>
							<Badge variant='secondary'>
								{wordCount} words • {paragraphs} paragraphs
							</Badge>
						</CardHeader>
						<CardContent>
							<pre className='whitespace-pre-wrap rounded-md bg-gray-50 p-6 text-sm dark:bg-gray-800 shadow-inner'>
								{generatedText}
							</pre>
						</CardContent>
					</Card>
				)}
			</div>
		</TooltipProvider>
	)
}
