import Layout from "@/components/layout/Layout";
import Section from "@/components/layout/Section";

import Home from "./components/sections/home/Home";
import Services from "./components/sections/services/Services";
import About from "./components/sections/about/About";
import Journey from "./components/sections/journey/Journey";
import Contact from "./components/sections/contact/Contact";

export default function App() {
  return (
    <Layout>
      {/* Full screen Home */}
      <Section id="home">
        <Home />
      </Section>

      <Section id="services">
        <Services />
      </Section>

      <Section id="about">
        <About />
      </Section>

      <Section id="journey">
        <Journey />
      </Section>

      <Section id="contact">
        <Contact />
      </Section>
    </Layout>
  );
}
