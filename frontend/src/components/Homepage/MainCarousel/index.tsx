"use client";
import { useGetAllMintedNFT } from "@/api/nft";
import { NFTCard } from "@/components/Cards/NftCard";
import { NFTItem } from "@/types";
import { Box } from "@mui/material";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

export const MainCarousel = () => {
  const { data: nftMap } = useGetAllMintedNFT();
  const allNftItems = ([] as NFTItem[]).concat(...Object.values(nftMap || {}));

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: { origin: "center", perView: 5, spacing: 10 },
      slideChanged() {
        console.log("slide changed");
      },
    },
    []
  );

  return (
    <Box sx={{ p: "2rem 0" }} ref={sliderRef} className="keen-slider">
      {[...allNftItems, ...allNftItems, ...allNftItems, ...allNftItems].map(
        (item) => (
          <div
            className="keen-slider__slide"
            key={item.tokenId + item.chainMetadata.chainId}
          >
            <NFTCard nft={item} />
          </div>
        )
      )}
    </Box>
  );
};

export default MainCarousel;
