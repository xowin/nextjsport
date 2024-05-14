import React from "react";

const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex justify-between">
        <span>
        <img src="/images/logo.png" alt="logo" width={60} height={60} />
        </span>
        <p className="text-slate-600">© 2024 Christian Rodrigues. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;