import { PlusIcon, MinusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

type ParagraphsControlProps = {
	paragraphs: number
	onParagraphsChange: (_count: number) => void
	paragraphSizes: number[]
	onParagraphSizesChange: (_sizes: number[]) => void
}

/**
 * Component for controlling the number of paragraphs and their sizes
 */
export const ParagraphsControl = ({
	paragraphs,
	onParagraphsChange,
	paragraphSizes,
	onParagraphSizesChange,
}: ParagraphsControlProps) => {
	const DEFAULT_PARAGRAPH_SIZE = 50
	const handleParagraphCountChange = (newCount: number) => {
		const validCount = Math.max(1, Math.min(10, newCount))
		const currentCount = paragraphSizes.length

		let newSizes = [...paragraphSizes]

		if (validCount > currentCount) {
			// Add new paragraphs with default size
			newSizes = [...paragraphSizes, ...new Array(validCount - currentCount).fill(DEFAULT_PARAGRAPH_SIZE)]
		} else {
			// Remove excess paragraphs
			newSizes = paragraphSizes.slice(0, validCount)
		}

		onParagraphSizesChange(newSizes)
		onParagraphsChange(validCount)
	}

	return (
		<div className='space-y-2'>
			<Label className='text-sm font-medium'>Paragraphs</Label>
			<div className='flex items-center space-x-3'>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							aria-label='Decrease number of paragraphs'
							onClick={() => handleParagraphCountChange(paragraphs - 1)}
							size='icon'
							variant='outline'
							disabled={paragraphs <= 1}
						>
							<MinusIcon className='h-4 w-4' />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Decrease paragraphs</TooltipContent>
				</Tooltip>

				<Input
					aria-label='Number of paragraphs'
					className='w-20 text-center'
					max={10}
					min={1}
					onChange={(e) => handleParagraphCountChange(Number(e.target.value))}
					type='number'
					value={paragraphs}
				/>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							aria-label='Increase number of paragraphs'
							onClick={() => handleParagraphCountChange(paragraphs + 1)}
							size='icon'
							variant='outline'
							disabled={paragraphs >= 10}
						>
							<PlusIcon className='h-4 w-4' />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Increase paragraphs</TooltipContent>
				</Tooltip>

				<span className='ml-2 text-sm text-gray-500'>Max: 10</span>
			</div>
		</div>
	)
}
