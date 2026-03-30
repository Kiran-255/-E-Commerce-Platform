import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-4">
          <h4 className="font-bold text-xl text-gray-900">Deen Essentials</h4>
          <p className="text-gray-500">Delivering quality Islamic products with simplicity and trust.</p>
          <div className="flex space-x-4 mt-2 text-gray-600">
            <a href="#" className="hover:text-green-600 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-green-600 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-green-600 transition"><FaInstagram /></a>
          </div>
        </div>
        <div className="space-y-4">
          <h5 className="font-semibold text-gray-900">Quick Links</h5>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="/shop" className="hover:text-green-600 transition">Shop</Link></li>
            <li><Link to="/about" className="hover:text-green-600 transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-green-600 transition">Contact</Link></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h5 className="font-semibold text-gray-900">Contact</h5>
          <p className="text-gray-600">Email: support@deenessentials.com</p>
          <p className="text-gray-600">Phone: +92 300 1234567</p>
        </div>
      </div>
      <div className="border-t border-gray-200 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Deen Essentials. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer