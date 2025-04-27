import { PlusIcon, MinusIcon, InfoIcon, RefreshCwIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'

type AdvancedSettingsProps = {
	paragraphSizes: number[]
	onParagraphSizesChange: (_sizes: number[]) => void
	sentenceComplexity: number
	onSentenceComplexityChange: (_complexity: number) => void
	paragraphs: number
	paragraphLengthMode: 'uniform' | 'random' | 'custom'
	onParagraphLengthModeChange: (_mode: 'uniform' | 'random' | 'custom') => void
	uniformParagraphSize: number
	onUniformParagraphSizeChange: (_size: number) => void
	onRandomParagraphSizes: () => void
}

export const AdvancedSettings = ({
	paragraphSizes,
	onParagraphSizesChange,
	sentenceComplexity,
	onSentenceComplexityChange,
	paragraphs,
	paragraphLengthMode,
	onParagraphLengthModeChange,
	uniformParagraphSize,
	onUniformParagraphSizeChange,
	onRandomParagraphSizes,
}: AdvancedSettingsProps) => {
	const handleParagraphSizeChange = (index: number, newSize: number) => {
		const validSize = Math.max(10, Math.min(100, newSize))
		const newSizes = [...paragraphSizes]
		newSizes[index] = validSize
		onParagraphSizesChange(newSizes)
	}

	return (
		<>
			<Separator className='my-4' />
			<div className='space-y-5'>
				<div>
					<div className='mb-2 flex items-center justify-between'>
						<Label className='text-sm font-medium'>Paragraph Length Mode</Label>
						<HoverCard>
							<HoverCardTrigger asChild>
								<Button
									aria-label='Paragraph length mode information'
									size='icon'
									variant='ghost'
									className='h-8 w-8'
								>
									<InfoIcon className='h-4 w-4' />
								</Button>
							</HoverCardTrigger>
							<HoverCardContent className='w-80'>
								Choose how paragraph lengths are determined.
							</HoverCardContent>
						</HoverCard>
					</div>
					<Select
						onValueChange={(value: 'uniform' | 'random' | 'custom') => onParagraphLengthModeChange(value)}
						value={paragraphLengthMode}
					>
						<SelectTrigger className='w-full'>
							<SelectValue placeholder='Select paragraph length mode' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='uniform'>Uniform Length</SelectItem>
							<SelectItem value='random'>Random Length</SelectItem>
							<SelectItem value='custom'>Custom Length</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{paragraphLengthMode === 'uniform' && (
					<div className='rounded-md bg-gray-50 p-4 dark:bg-gray-900'>
						<div className='mb-2 flex items-center justify-between'>
							<Label className='text-sm font-medium'>Uniform Paragraph Size</Label>
							<HoverCard>
								<HoverCardTrigger asChild>
									<Button
										aria-label='Uniform paragraph size information'
										size='icon'
										variant='ghost'
										className='h-8 w-8'
									>
										<InfoIcon className='h-4 w-4' />
									</Button>
								</HoverCardTrigger>
								<HoverCardContent className='w-80'>Set the size for all paragraphs.</HoverCardContent>
							</HoverCard>
						</div>
						<div className='flex items-center space-x-4'>
							<Slider
								aria-label='Uniform paragraph size slider'
								className='flex-grow'
								max={100}
								min={10}
								onValueChange={(value) => onUniformParagraphSizeChange(value[0])}
								step={5}
								value={[uniformParagraphSize]}
							/>
							<Input
								aria-label='Uniform paragraph size input'
								className='w-20 text-center'
								max={100}
								min={10}
								onChange={(e) => onUniformParagraphSizeChange(Number(e.target.value))}
								type='number'
								value={uniformParagraphSize}
							/>
						</div>
					</div>
				)}

				{paragraphLengthMode === 'random' && (
					<div className='rounded-md bg-gray-50 p-4 dark:bg-gray-900'>
						<Button
							className='w-full'
							onClick={onRandomParagraphSizes}
							variant='outline'
						>
							<RefreshCwIcon className='mr-2 h-4 w-4' />
							Generate Random Sizes
						</Button>
					</div>
				)}

				{paragraphLengthMode === 'custom' && (
					<div className='rounded-md bg-gray-50 p-4 dark:bg-gray-900'>
						<div className='mb-2 flex items-center justify-between'>
							<Label className='text-sm font-medium'>Paragraph Sizes</Label>
							<HoverCard>
								<HoverCardTrigger asChild>
									<Button
										aria-label='Paragraph sizes information'
										size='icon'
										variant='ghost'
										className='h-8 w-8'
									>
										<InfoIcon className='h-4 w-4' />
									</Button>
								</HoverCardTrigger>
								<HoverCardContent className='w-80'>
									Customize the number of words in each paragraph. Minimum 10, maximum 100 words per
									paragraph.
								</HoverCardContent>
							</HoverCard>
						</div>
						<div className='max-h-64 overflow-y-auto pr-2'>
							{Array.from({ length: paragraphs }).map((_, index) => (
								<div
									className='mb-4 flex items-center space-x-4'
									key={index}
								>
									<Label className='w-24 text-sm'>Paragraph {index + 1}</Label>
									<div className='flex flex-grow items-center space-x-2'>
										<Slider
											aria-label={`Adjust size of paragraph ${index + 1}`}
											className='flex-grow'
											max={100}
											min={10}
											onValueChange={(value) => handleParagraphSizeChange(index, value[0])}
											step={5}
											value={[paragraphSizes[index]]}
										/>
										<Input
											aria-label={`Size of paragraph ${index + 1}`}
											className='w-20 text-center'
											max={100}
											min={10}
											onChange={(e) => handleParagraphSizeChange(index, Number(e.target.value))}
											type='number'
											value={paragraphSizes[index]}
										/>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				<div className='rounded-md bg-gray-50 p-4 dark:bg-gray-900'>
					<div className='mb-2 flex items-center justify-between'>
						<Label className='text-sm font-medium'>Sentence Complexity</Label>
						<HoverCard>
							<HoverCardTrigger asChild>
								<Button
									aria-label='Sentence complexity information'
									size='icon'
									variant='ghost'
									className='h-8 w-8'
								>
									<InfoIcon className='h-4 w-4' />
								</Button>
							</HoverCardTrigger>
							<HoverCardContent className='w-80'>
								Control the intricacy of generated sentences. Lower values create simpler sentences,
								higher values create more complex ones.
							</HoverCardContent>
						</HoverCard>
					</div>
					<div className='flex items-center space-x-4'>
						<Button
							aria-label='Decrease sentence complexity'
							onClick={() => onSentenceComplexityChange(Math.max(1, sentenceComplexity - 1))}
							size='icon'
							variant='outline'
						>
							<MinusIcon className='h-4 w-4' />
						</Button>
						<Slider
							aria-label='Adjust sentence complexity'
							className='flex-grow'
							max={4}
							min={1}
							onValueChange={(value) => onSentenceComplexityChange(value[0])}
							step={1}
							value={[sentenceComplexity]}
						/>
						<Button
							aria-label='Increase sentence complexity'
							onClick={() => onSentenceComplexityChange(Math.min(4, sentenceComplexity + 1))}
							size='icon'
							variant='outline'
						>
							<PlusIcon className='h-4 w-4' />
						</Button>
						<Input
							aria-label='Sentence complexity value'
							className='w-20 text-center'
							max={4}
							min={1}
							onChange={(e) =>
								onSentenceComplexityChange(Math.max(1, Math.min(4, Number(e.target.value))))
							}
							type='number'
							value={sentenceComplexity}
						/>
					</div>
				</div>
			</div>
		</>
	)
}
