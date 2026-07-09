const NavLink = ({ href, title }) => {
  return (
    <a
      href={href}
      className="block py-2 pl-3 pr-4 text-blue-200/80 sm:text-lg font-medium rounded md:p-0 hover:text-sky-300 transition-colors"
    >
      {title}
    </a>
  );
};

export default NavLink;
