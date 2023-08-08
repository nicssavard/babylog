import Head from "next/head";

import { Footer } from "@/components/index/Footer";
import { Header } from "~/components/header/Header";
import { Hero } from "~/components/index/Hero";
import { Pricing } from "@/components/index/Pricing";
import { PrimaryFeatures } from "@/components/index/PrimaryFeatures";
import Testimonials from "~/components/index/Testimonials";

export default function Home() {
  return (
    <>
      <Head>
        <title>BabySleep</title>
      </Head>
      <Header />
      <main className="bg-white">
        <Hero />
        <PrimaryFeatures />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
