import Banner from "@/components/Banner";
import CustomerReviews from "@/components/CustomerReviews";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";
export default function Home() {
  return (
    <div
      initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
      
      className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Banner></Banner>
      <WhyChooseUs></WhyChooseUs>
      <CustomerReviews></CustomerReviews>
      <HowItWorks></HowItWorks>
    </div>
  );
}
