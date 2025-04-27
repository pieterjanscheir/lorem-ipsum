import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IpsumTypes } from '@/constants/ipsum-types'
import { IpsumType } from '@/types'

/**
 * Props for the IpsumTypeSelector component
 */
type IpsumTypeSelectorProps = {
	/** Currently selected ipsum type */
	type: IpsumType
	/** Callback function when type changes */
	onTypeChange: (_type: IpsumType) => void
}

/**
 * Component for selecting the type of ipsum text to generate
 */
export const IpsumTypeSelector = ({ type, onTypeChange }: IpsumTypeSelectorProps) => {
	const hasIpsumTypes = Object.keys(IpsumTypes).length > 0

	return (
		<div className='space-y-2'>
			<Label className='text-sm font-medium'>Ipsum Type</Label>
			<Select
				disabled={!hasIpsumTypes}
				onValueChange={onTypeChange}
				value={type}
			>
				<SelectTrigger className='w-full'>
					<SelectValue placeholder={hasIpsumTypes ? 'Select Ipsum Type' : 'No ipsum types defined'} />
				</SelectTrigger>
				<SelectContent>
					{Object.keys(IpsumTypes).map((ipsumType) => (
						<SelectItem
							key={ipsumType}
							value={ipsumType}
						>
							{ipsumType.charAt(0) + ipsumType.slice(1).toLowerCase()} Ipsum
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}
