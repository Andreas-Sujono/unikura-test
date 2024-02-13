"use client";
import { useGetAllMintedNFT } from "@/api/nft";
import { NFTCard } from "@/components/Cards/NftCard";
import { useWindowSize } from "@/hooks/useWindowSize";
import { NFTItem } from "@/types";
import { Box, CircularProgress } from "@mui/material";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

export const MainCarousel = () => {
  const { data: nftMap } = useGetAllMintedNFT();
  const allNftItems = ([] as NFTItem[]).concat(...Object.values(nftMap || {}));
  const { width } = useWindowSize();

  const itemShown = width > 900 ? 5 : width > 600 ? 3 : width > 400 ? 2 : 1;

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: { origin: "center", perView: itemShown, spacing: 10 },
      slideChanged() {
        console.log("slide changed");
      },
    },
    [
      (slider) => {
        let timeout: any;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  if (!allNftItems.length) {
    return (
      <Box
        sx={{
          p: "2rem 0",
          minHeight: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "white" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: "2rem 0" }} ref={sliderRef} className="keen-slider">
      {[...allNftItems].map((item) => (
        <div
          className="keen-slider__slide"
          key={item.tokenId + item.chainMetadata.chainId}
        >
          <NFTCard nft={item} />
        </div>
      ))}
    </Box>
  );
};

export default MainCarousel;
