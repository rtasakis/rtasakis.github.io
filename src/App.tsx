import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "@/components/layout/Layout";
import Section from "@/components/layout/Section";
import LegalLayout from "@/components/layout/LegalLayout";

import Home from "@/components/sections/home/Home";
import Services from "@/components/sections/services/Services";
import About from "@/components/sections/about/About";
import Journey from "@/components/sections/journey/Journey";
import Contact from "@/components/sections/contact/Contact";

import ImprintPage from "@/components/ImprintPage";
import PrivacyPolicyPage from "@/components/PrivacyPolicyPage";

function HomePage() {
  return (
    <Layout>
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/imprint"
        element={
          <LegalLayout>
            <ImprintPage />
          </LegalLayout>
        }
      />

      <Route
        path="/privacy-policy"
        element={
          <LegalLayout>
            <PrivacyPolicyPage />
          </LegalLayout>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
