import React from 'react';

function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-4 text-center">
      <div className="container mx-auto">
        <p className="text-sm">NGO Organisation</p>
        <p className="text-xs">Providing healthcare access to all.</p>
        <p className="text-xs mt-2">Contact Us: 123 Medical Avenue, City | Phone: +123 456 789 | Email: info@medicalcamp.org</p>
        <p className="text-xs mt-2">Follow Us: <a href="#" className="text-white hover:underline">Facebook</a>, <a href="#" className="text-white hover:underline">Twitter</a>, <a href="#" className="text-white hover:underline">Instagram</a></p>
      </div>
    </footer>
  );
}

export default Footer;
