import Head from "next/head";

// import { CallToAction } from '@/components/CallToAction'
// import { Faqs } from '@/components/Faqs'
// import { Footer } from '@/components/Footer'
import { Header } from "~/components/header/Header";
import { Hero } from "~/components/index/Hero";
// import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from "@/components/index/PrimaryFeatures";
// import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import Testimonials from "~/components/index/Testimonials";

export default function Home() {
  return (
    <>
      <Head>
        <title>BabySleep</title>
        <meta
          name="description"
          content="Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        {/* <SecondaryFeatures />
        <CallToAction /> */}
        <Testimonials />
        {/* <Pricing />
        <Faqs /> */}
      </main>
      {/* <Footer /> */}
    </>
  );
}
