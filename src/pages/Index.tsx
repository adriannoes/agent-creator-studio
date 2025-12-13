import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Playground from "@/components/Playground";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <Playground />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
