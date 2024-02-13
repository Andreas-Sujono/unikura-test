import MainCarousel from "@/components/Homepage/MainCarousel";
import NftTable from "@/components/Homepage/NftTable";
import TopSummary from "@/components/Homepage/TopSummary";

export default function Home() {
  return (
    <main className="sm:pt-24 sm:p-8 p-4 pt-16 ">
      <MainCarousel />
      <TopSummary />
      <NftTable />
    </main>
  );
}
