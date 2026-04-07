import ParallaxElement from './ParallaxElement';
import ScrollReveal from './ScrollReveal';

export default function PageHero({ children, className = "", style = {} }) {
  return (
    <section className={`page-hero ${className}`} style={style}>
      <ParallaxElement speed={-0.1} className="page-hero-bg-parallax">
        <div className="page-hero-bg"></div>
        <div className="page-hero-text">WISDOM</div>
      </ParallaxElement>
      <ScrollReveal direction="up" delay={0.1}>
        {children}
      </ScrollReveal>
    </section>
  );
}
