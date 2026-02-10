import { useEffect, useState, memo } from "react"
import clsx from "clsx"

const Navbar = memo(() => {
	// const [navItems, setNavItems] = useState<any[]>([
	// 	{
	// 		label: "Create Query",
	// 		path: "/create-query",
	// 	},
	// 	{
	// 		label: "Queries",
	// 		path: "/file-translate",
	// 	},
	// ])

	const [isToggleOpen, setIsToggleOpen] = useState(false)

	// useEffect(() => {
	// 	setIsToggleOpen(false)
	// }, [location])
	return (
		<header
			className={clsx(
				"sticky top-0 left-0 z-20 w-full after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full  lg:backdrop-blur-sm lg:after:hidden bg-navbar-gradient bg-cover bg-top h-[5.5rem]",
				!isToggleOpen &&
					"shadow-md shadow-gilead-light-red after:bg-gilead-light-red lg:border-gilead-light-red"
			)}
		>
			<div className="relative mx-auto max-w-full pl-8 pr-8">
				<nav
					aria-label="main navigation"
					className="flex items-center justify-between"
					role="navigation"
				>
					{/*      <!-- Brand logo --> */}
					<div
						id="gileadLogo"
						aria-label="Gilead logo"
						aria-current="page"
						className="text-white flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1 absolute top-0"
					>
						<img
							src="/png/whiteLogoTagline.png"
							width={200}
							height={200}
							alt="BannerImage"
						/>
					</div>

				</nav>
			</div>
		</header>
	)
})

export default Navbar
