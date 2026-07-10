import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, User, Package, PlusCircle, Menu, X } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/', label: 'My Products', end: false },
  { to: '/product-entry-page', label: 'Add Products', icon: PlusCircle },
  { to: '/cart', label: 'Cart', icon: ShoppingCart },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/order-history', label: 'Orders', icon: Package },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const desktopLinkClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
      isActive
        ? 'text-blue-600 bg-blue-50'
        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2.5 rounded-md text-base font-medium transition-colors duration-150 ${
      isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <ShoppingBag className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-bold text-gray-900 tracking-tight">
              ShopEase
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex md:items-center">
            <ul className="flex items-center gap-1">
              {navItems.map(({ to, label, end, icon: Icon }) => (
                <li key={label}>
                  <NavLink to={to} end={end} className={desktopLinkClass}>
                    {Icon && <Icon className="w-4 h-4" />}
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={toggleMenu}
            type="button"
            className="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200" id="mobile-menu">
          <ul className="px-2 py-2 space-y-1">
            {navItems.map(({ to, label, end, icon: Icon }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  end={end}
                  className={mobileLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
