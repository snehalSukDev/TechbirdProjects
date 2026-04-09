import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TwoWaysToWin from "@/components/TwoWaysToWin";
import LogoStrip, { BrandLogoStrip } from "@/components/LogoStrip";
import ValueProp from "@/components/ValueProp";
import Services from "@/components/Services";
import GrowthSection from "@/components/GrowthSection";
import Stats from "@/components/Stats";
import CaseStudies from "@/components/CaseStudies";
import BookSection from "@/components/BookSection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <TwoWaysToWin />

        <ValueProp />
        <Services />
        <Stats />
        <GrowthSection />
        <CaseStudies />
        <BrandLogoStrip />
        <BookSection />
        <Testimonials />
        <CTASection />
        <FAQ />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
