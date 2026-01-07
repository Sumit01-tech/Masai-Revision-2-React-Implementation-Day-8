import { useEffect, useRef, useState, forwardRef } from "react";

function ScrollNavigation() {
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);
  const contactRef = useRef(null);

  const sectionRefs = {
    About: aboutRef,
    Services: servicesRef,
    Portfolio: portfolioRef,
    Contact: contactRef
  };

  const [active, setActive] = useState("About");

  const handleScrollTo = (section) => {
    sectionRefs[section].current.scrollIntoView({
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      for (let [name, ref] of Object.entries(sectionRefs)) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 150) {
          setActive(name);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav style={navStyle}>
        {Object.keys(sectionRefs).map((section) => (
          <button
            key={section}
            onClick={() => handleScrollTo(section)}
            style={{
              fontWeight: active === section ? "bold" : "normal",
              cursor: "pointer"
            }}
          >
            {section}
          </button>
        ))}
      </nav>

      <ForwardedSection ref={aboutRef} title="About" />
      <ForwardedSection ref={servicesRef} title="Services" />
      <ForwardedSection ref={portfolioRef} title="Portfolio" />
      <ForwardedSection ref={contactRef} title="Contact" />
    </>
  );
}

const Section = ({ title }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        height: "100vh",
        padding: "80px 20px",
        borderBottom: "1px solid #ccc"
      }}
    >
      <h2>{title}</h2>
    </div>
  );
};

const ForwardedSection = forwardRef(Section);

const navStyle = {
  position: "fixed",
  top: 0,
  width: "100%",
  background: "#fff",
  display: "flex",
  gap: "20px",
  padding: "10px",
  zIndex: 1000
};

export default ScrollNavigation;
