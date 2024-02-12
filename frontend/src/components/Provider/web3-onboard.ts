import { blockchains } from "@/constants";
import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";

const injected = injectedModule();

const chains = blockchains.map((item) => ({
  id: item.chainIdHex,
  token: item.nativeToken,
  label: item.label,
  rpcUrl: item.rpcUrl,
}));

export default init({
  wallets: [injected],
  chains,
  theme: "dark",
  appMetadata: {
    name: "NFTApp",
    icon: "/logo-white.svg",
    logo: "/logo-white.svg",
    description: "NFT App",
    gettingStartedGuide: "http://mydapp.io/getting-started",
    explore: "http://mydapp.io/about",
    recommendedInjectedWallets: [
      {
        name: "MetaMask",
        url: "https://metamask.io",
      },
    ],
    // // Optional - but allows for dapps to require users to agree to TOS and privacy policy before connecting a wallet
    // agreement: {
    //   version: "1.0.0",
    //   termsUrl: "https://www.blocknative.com/terms-conditions",
    //   privacyUrl: "https://www.blocknative.com/privacy-policy",
    // },
  },
});
