<script lang="ts" type="module">
  import ListERC721BalanceTier from "./routes/erc721-balance-tier/ListERC721BalanceTier.svelte";
  import ListGatedNFTs from "./routes/gated-nft/ListGatedNFTs.svelte";
  import ERC721BalanceTierReport from "./routes/erc721-balance-tier/ERC721BalanceTierReport.svelte";
  import { signer } from "svelte-ethers-store";
  import Router from "svelte-spa-router";
  import DeployBalanceTier from "./routes/erc20-balance-tier/DeployBalanceTier.svelte";
  import BalanceTierReport from "./routes/erc20-balance-tier/BalanceTierReport.svelte";
  import Home from "./routes/Home.svelte";
  import DeployGatedNFT from "./routes/gated-nft/DeployGatedNFT.svelte";
  import MintNft from "./routes/gated-nft/MintNFT.svelte";
  import Header from "./layout/Header.svelte";
  import Sidebar from "./layout/Sidebar.svelte";
  import ListBalanceTier from "./routes/erc20-balance-tier/ListBalanceTier.svelte";
  import DeployCombineTier from "./routes/combine-tier/DeployCombineTier.svelte";
  import CombineTierReport from "./routes/combine-tier/CombineTierReport.svelte";
  import Deploy721BalanceTier from "./routes/erc721-balance-tier/Deploy721BalanceTier.svelte";
  import DeploySale from "./routes/sale/DeploySale.svelte";
  import PurchaseSale from "./routes/sale/PurchaseSale.svelte";
  import DeployEmissions from "./routes/emissions-erc20/DeployEmissions.svelte";
  import ClaimEmissions from "./routes/emissions-erc20/ClaimEmissions.svelte";
  import Modal from "svelte-simple-modal";
  import DeployVerify from "./routes/verify/DeployVerify.svelte";
  import AdministerVerify from "./routes/verify/AdministerVerify.svelte";
  import AddressLibrary from "./routes/address-library/AddressLibrary.svelte";
  import ListCombineTier from "./routes/combine-tier/ListCombineTier.svelte";
  import ListSale from "./routes/sale/ListSale.svelte";
  import Footer from "./layout/Footer.svelte";
  import DeployTransferTier from "./routes/erc20-transfer-tier/DeployTransferTier.svelte";
  import TransferTierReport from "./routes/erc20-transfer-tier/TransferTierReport.svelte";
  import ListTransferTier from "./routes/erc20-transfer-tier/ListTransferTier.svelte";
  import DeployERC20 from "./routes/mint-erc20/DeployERC20.svelte";
  import MintFromExistingERC20 from "./routes/mint-erc20/MintFromExistingERC20.svelte";
  import HoldingTimeTransferTier from "./routes/combine-tier/HoldingTimeTransferTier.svelte";
  import ListFaucets from "./routes/mint-erc20/ListFaucets.svelte";
  import ListVerifies from "./routes/verify/ListVerifies.svelte";
  import ListVerifyTiers from "./routes/verify/ListVerifyTiers.svelte";
  import VerifyTierReport from "./routes/verify/VerifyTierReport.svelte";

  let routes = {};

  routes = {
    // Using named parameters, with last being optional
    "/erc20balancetier/deploy": DeployBalanceTier,
    "/erc20balancetier/report/*": BalanceTierReport,
    "/erc20balancetier/list": ListBalanceTier,

    "/erc721balancetier/deploy": Deploy721BalanceTier,
    "/erc721balancetier/report/*": ERC721BalanceTierReport,
    "/erc721balancetier/list": ListERC721BalanceTier,

    "/combinetier/deploy": DeployCombineTier,
    "/combinetier/deployHoldingTimeTransferTier": HoldingTimeTransferTier,
    "/combinetier/report/*": CombineTierReport,
    "/combinetier/list": ListCombineTier,

    "/erc20transfertier/deploy": DeployTransferTier,
    "/erc20transfertier/report/*": TransferTierReport,
    "/erc20transfertier/list": ListTransferTier,

    "/gatednft/deploy/*": DeployGatedNFT,
    "/gatednft/list": ListGatedNFTs,
    "/gatednft/mint/*": MintNft,

    "/sale/deploy": DeploySale,
    "/sale/purchase/*": PurchaseSale,
    "/sale/list": ListSale,

    "/emissions/deploy": DeployEmissions,
    "/emissions/claim/*": ClaimEmissions,

    "/verify/deploy": DeployVerify,
    "/verify/administer/*": AdministerVerify,
    "/verify/list": ListVerifies,
    "/verify/verifyTiers/list": ListVerifyTiers,
    "/verify/verifyTiers/report/*": VerifyTierReport,

    "/erc20/deploy": DeployERC20,
    "/erc20/mint/*": MintFromExistingERC20,
    "/erc20/list": ListFaucets,

    "/address-library": AddressLibrary,

    "/": Home,

    // Catch-all
    // This is optional, but if present it must be the last
    // '*': NotFound,
  };
</script>

<Modal
  unstyled={true}
  closeButton={false}
  classWindow="relative max-w-full max-h-full my-2 mx-auto text-white rounded-xl shadow-md bg-gray-800"
  classBg="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center bg-gray-900 bg-opacity-75 z-50 backdrop-blur"
  classWindowWrap="relative m-2 max-h-full flex flex-col"
  classContent="p-6"
>
  <Header />
  <main class="relative flex font-light text-gray-50">
    <Sidebar />
    <div class="w-full py-5 px-8">
      {#if $signer}
        <Router {routes} />
      {:else}
        Connect your wallet to get started.
      {/if}
    </div>
  </main>
  <Footer />
</Modal>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
