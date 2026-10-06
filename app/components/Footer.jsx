import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-blue-400/20 border-l-transparent border-r-transparent text-blue-200/60">
      <div className="container p-12 flex justify-between items-center">
        <Logo className="h-10 w-10 text-lg" />
        <p className="text-sm">© 2026 Christian Rodrigues. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
