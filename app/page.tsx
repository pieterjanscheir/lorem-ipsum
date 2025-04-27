import { LoremIpsumGenerator } from '@/components/lorem-ipsum-generator'
import { ThemeToggle } from '@/components/theme-toggle'
import { GithubIcon } from 'lucide-react'

export default function Home() {
	return (
		<div className='flex min-h-screen flex-col'>
			<header className='container mx-auto flex items-center justify-between p-4 sm:p-6'>
				<h1 className='text-xl font-semibold'>Lorem Ipsum Generator</h1>
				<ThemeToggle />
			</header>

			<main className='container mx-auto flex-1 px-4 py-6 sm:px-6 sm:py-8'>
				<LoremIpsumGenerator className='mx-auto' />
			</main>

			<footer className='border-t bg-card py-6'>
				<div className='container mx-auto flex flex-col items-center justify-between space-y-4 px-4 text-sm text-muted-foreground sm:flex-row sm:space-y-0 sm:px-6'>
					<p>&copy; {new Date().getFullYear()} - Text generator for designers and developers</p>
					<div className='flex flex-col items-center space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0'>
						<a
							href='https://scheir.eu'
							className='flex items-center hover:text-foreground transition-colors font-medium'
						>
							Made with ❤️ by Pieter-Jan Scheir
						</a>
						<div className='hidden sm:block text-border'>|</div>
						<a
							href='https://github.com/pieterjanscheir/lorem-ipsum'
							className='flex items-center hover:text-foreground transition-colors'
						>
							<GithubIcon className='mr-2 h-4 w-4' />
							Source Code
						</a>
					</div>
				</div>
			</footer>
		</div>
	)
}
