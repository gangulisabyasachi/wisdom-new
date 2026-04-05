export default function PageHero({ children, className = "", style = {} }) {
  return (
    <section className={`page-hero ${className}`} style={style}>
      <div className="page-hero-bg"></div>
      <div className="page-hero-text">WISDOM</div>
      {children}
    </section>
  );
}
