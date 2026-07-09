import React from "react";

const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-blue-400/20 border-l-transparent border-r-transparent text-blue-200/60">
      <div className="container p-12 flex justify-between items-center">
        <span>
        <img src="/images/logo.png" alt="logo" width={60} height={60} />
        </span>
        <p className="text-sm">© 2026 Christian Rodrigues. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
