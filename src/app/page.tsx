import GetData from "@/components/GetData";
import Header from "@/components/Header";
import OutLink from "@/components/OutLink";
import Swap from "@/components/Swap";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <OutLink />
      <Swap />
      {children}
      <GetData />
    </>
  );
}
