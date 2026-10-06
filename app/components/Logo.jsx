const Logo = ({ className = "h-12 w-12 text-2xl" }) => (
  <span
    aria-hidden="true"
    className={`font-display inline-flex select-none items-center justify-center rounded-xl border border-signal/50 bg-signal/10 font-extrabold leading-none tracking-tight text-white ${className}`}
  >
    C<span className="text-signal">R</span>
  </span>
);

export default Logo;
