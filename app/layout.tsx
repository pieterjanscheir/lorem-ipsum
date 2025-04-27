import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Lorem Ipsum Generator - Professional Placeholder Text',
	description:
		'Create custom Lorem Ipsum text with precise control. Perfect for designers and developers needing placeholder text for their projects.',
	keywords: [
		'Lorem Ipsum generator',
		'custom placeholder text',
		'designer tools',
		'developer tools',
		'custom Lorem Ipsum',
		'placeholder text',
		'paragraph generator',
		'sentence complexity',
		'design tools',
		'placeholder text generator',
		'content creation',
	],
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
				<Toaster />
			</body>
		</html>
	)
}
