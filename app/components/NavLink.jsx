const NavLink = ({ href, title }) => {
  return (
    <a
      href={href}
      className="block py-2 pl-3 pr-4 text-slate-600 sm:text-lg font-medium rounded md:p-0 hover:text-slate-900 transition-colors"
    >
      {title}
    </a>
  );
};

export default NavLink;
