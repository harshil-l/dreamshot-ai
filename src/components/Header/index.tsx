import Link from 'next/link'
import { Logo } from '../Icons'
import { Button } from '../ui/button'
import { ArrowDownIcon, ArrowRightIcon, MenuIcon } from 'lucide-react'

export default function Header() {
    return (
        <header className="w-full border-b">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo/Brand */}
                <Link href="/dashboard" className="text-xl font-bold">
                    <Logo className="w-40 h-fit" />
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-15">
                    <Link href="/dashboard" className="hover:text-gray-600">
                        Home
                    </Link>
                    <Link href="/dashboard" className="hover:text-gray-600 flex items-center gap-1">
                        Tools <ArrowDownIcon className="w-4 h-4" />
                    </Link>
                    <Link href="/dashboard" className="hover:text-gray-600">
                        Pricing
                    </Link>
                    <Link href="/dashboard" className="hover:text-gray-600">
                        Contact us
                    </Link>
                </div>

                <Button variant='dark' className='hidden md:flex py-4 h-12 has-[>svg]:!px-6'>Get Started <ArrowRightIcon className="w-4 h-4" /> </Button>
                <button className='md:hidden'>
                    <MenuIcon className="w-4 h-4" />
                </button>
            </nav>
        </header>
    )
}
