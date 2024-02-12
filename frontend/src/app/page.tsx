import MainCarousel from "@/components/Homepage/MainCarousel";
import { NftTable } from "@/components/Homepage/NftTable";
import TopSummary from "@/components/Homepage/TopSummary";

export default function Home() {
  return (
    <main className="p-16 pt-24">
      <MainCarousel />
      <TopSummary />
      <NftTable />
    </main>
  );
}
