"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, FileText, Gamepad2, Zap, Users, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
	{ name: "Inicio", href: "/", icon: Home },
	//{ name: "Overview", href: "/overview", icon: FileText },
	{ name: "Juego VR", href: "/vr-game", icon: Gamepad2 },
	{ name: "Proyecto Final", href: "/final-project", icon: Zap },
	{ name: "Sobre nosotros", href: "/team", icon: Users },
]

export function Navigation() {
	const pathname = usePathname()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
	const closeMenu = () => setIsMenuOpen(false)

	return (
		<>
			<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 horror-glow">
				<div className="container flex h-16 max-w-screen-2xl items-center justify-between">
					{/* Logo */}
					<Link
						href="/"
						className="flex items-center space-x-2"
						onClick={closeMenu}
					>
						<img 
							src="/worstg.png" 
							alt="Worst Generation Logo"
							className="h-8 w-auto drop-shadow-lg logo-glow scale-[0.7]"
						/>
					</Link>

					{/* Desktop Navigation - Centrada */}
					<nav className="hidden md:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
						{navigation.map((item) => {
							const Icon = item.icon
							// Habilitar Proyecto Final
							// if (item.name === "Proyecto Final") {
							// 	return (
							// 		<Button
							// 			key={item.href}
							// 			variant="ghost"
							// 			className="text-sm font-medium opacity-50 cursor-not-allowed"
							// 			disabled
							// 		>
							// 			<div className="flex items-center space-x-2">
							// 				<Icon className="h-4 w-4" />
							// 				<span>{item.name}</span>
							// 			</div>
							// 		</Button>
							// 	)
							// }

							return (
								<Button
									key={item.href}
									variant={
										pathname === item.href ? "default" : "ghost"
									}
									asChild
									className="text-sm font-medium horror-glow"
								>
									<Link
										href={item.href}
										className="flex items-center space-x-2"
									>
										<Icon className="h-4 w-4" />
										<span>{item.name}</span>
									</Link>
								</Button>
							)
						})}
					</nav>

					{/* Right side controls */}
					<div className="flex items-center space-x-2">
						<div className="md:hidden">
							<Button variant="ghost" size="sm" onClick={toggleMenu}>
								{isMenuOpen ? (
									<X className="h-5 w-5" />
								) : (
									<Menu className="h-5 w-5" />
								)}
							</Button>
						</div>
					</div>
				</div>
			</header>

			{/* Mobile Menu Overlay */}
			{isMenuOpen && (
				<>
					{/* Backdrop */}
					<div
						className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
						onClick={closeMenu}
					/>

					{/* Mobile Menu */}
					<div className="fixed top-16 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 border-b border-border/40 z-40 md:hidden horror-glow">
						<nav className="container py-4 space-y-2">
							{navigation.map((item) => {
								const Icon = item.icon
								
								// Habilitar Proyecto Final en móvil
								// if (item.name === "Proyecto Final") {
								// 	return (
								// 		<Button
								// 			key={item.href}
								// 			variant="ghost"
								// 			className="w-full justify-start opacity-50 cursor-not-allowed"
								// 			disabled
								// 		>
								// 			<Icon className="h-4 w-4 mr-2" />
								// 			{item.name}
								// 		</Button>
								// 	)
								// }
								return (
									<Button
										key={item.href}
										variant={
											pathname === item.href ? "default" : "ghost"
										}
										asChild
										className={cn(
											"w-full justify-start text-base font-medium horror-glow",
											pathname === item.href &&
												"bg-primary text-primary-foreground"
										)}
										onClick={closeMenu}
									>
										<Link
											href={item.href}
											className="flex items-center space-x-3"
										>
											<Icon className="h-5 w-5" />
											<span>{item.name}</span>
										</Link>
									</Button>
								)
							})}
						</nav>
					</div>
				</>
			)}
		</>
	)
}
