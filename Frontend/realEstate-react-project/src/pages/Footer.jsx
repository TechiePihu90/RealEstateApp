

const Footer = () => {

  return (
    <footer className="bg-gray-400 text-black mt-12 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        
        <div>
          <h2 className="font-bold text-lg mb-3">Get to Know Us</h2>
          <ul className="space-y-2">
            <li>About Easy Homes</li>
            <li>Our Vision</li>
            <li>Blog</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-3">Connect with Us</h2>
          <ul className="space-y-2">
            <li>Facebook</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-3">Buy/Sell with Us</h2>
          <ul className="space-y-2">
            <li>List Your Property</li>
            <li>Rent a Property</li>
            <li>Pricing Plans</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-3">Support</h2>
          <ul className="space-y-2">
            <li>FAQs</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
          <p className="text-black mt-2">
            📧 payalsaini@email.com | 📞 123-456-7890
          </p>
        </div>
      </div>

      <div className="text-center mt-6 text-black">
        © 2025 Easy Homes. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
