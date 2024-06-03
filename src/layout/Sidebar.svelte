<script>
  import SidebarLink from "../components/SidebarLink.svelte";
  import SidebarLinkGroup from "../components/SidebarLinkGroup.svelte";
</script>

<div class="min-h-screen w-96 border-r border-gray-700">
  <div class="sticky top-16 flex flex-col  gap-y-3 self-start p-5">
    <SidebarLinkGroup label="TransferTier" url="/erc20transfertier/*">
      <SidebarLink url="/erc20transfertier/deploy"
        >Deploy a ERC20TransferTier</SidebarLink
      >

      <SidebarLink url="/erc20transfertier/report/">
        Check a ERC20TransferTier Report
      </SidebarLink>

      <SidebarLink url="/erc20transfertier/list">
        Browse deployed ERC20TransferTiers
      </SidebarLink>
    </SidebarLinkGroup>

    <SidebarLinkGroup label="ERC20BalanceTier" url="/erc20balancetier/*">
      <SidebarLink url="/erc20balancetier/deploy">
        Deploy an ERC20BalanceTier
      </SidebarLink>

      <SidebarLink url="/erc20balancetier/report/">
        Check an ERC20BalanceTier Report
      </SidebarLink>

      <SidebarLink url="/erc20balancetier/list">
        Browse deployed ERC20BalanceTiers
      </SidebarLink>
    </SidebarLinkGroup>

    <SidebarLinkGroup label="ERC721BalanceTier" url="/erc721balancetier/*">
      <SidebarLink url="/erc721balancetier/deploy">
        Deploy an ERC721BalanceTier
      </SidebarLink>

      <SidebarLink url="/erc721balancetier/report/">
        Check an ERC721BalanceTier Report
      </SidebarLink>

      <SidebarLink url="/erc721balancetier/list">
        Browse deployed ERC721BalanceTiers
      </SidebarLink>
    </SidebarLinkGroup>

    <SidebarLinkGroup label="CombineTier" url="/combinetier/*">
      <SidebarLink url="/combinetier/deploy">Deploy a CombineTier</SidebarLink>

      <SidebarLink url="/combinetier/deployHoldingTimeTransferTier"
        >Deploy a HasHeldFor CombineTier</SidebarLink
      >

      <SidebarLink url="/combinetier/report/">
        Check a CombineTier Report
      </SidebarLink>

      <SidebarLink url="/combinetier/list">
        Browse deployed CombineTiers
      </SidebarLink>
    </SidebarLinkGroup>

    <SidebarLinkGroup label="GatedNFT" url="/gatednft/*">
      <SidebarLink url="/gatednft/deploy/">Deploy a Gated NFT</SidebarLink>

      <SidebarLink url="/gatednft/mint/">Mint a Gated NFT</SidebarLink>

      <SidebarLink url="/gatednft/list">List deployed GatedNFTs</SidebarLink>
    </SidebarLinkGroup>

    <SidebarLinkGroup label="Sale" url="/sale/*">
      <SidebarLink url="/sale/deploy">Deploy a Sale</SidebarLink>

      <SidebarLink url="/sale/purchase/">Purchase rTKN from a Sale</SidebarLink>

      <SidebarLink url="/sale/list">List deployed Sales</SidebarLink>
    </SidebarLinkGroup>

    <SidebarLinkGroup label="Emissions" url="/emissions/*">
      <SidebarLink url="/emissions/deploy">
        Deploy an EmissionsERC20
      </SidebarLink>

      <SidebarLink url="/emissions/claim/">Claim an EmissionsERC20</SidebarLink>
    </SidebarLinkGroup>

    <SidebarLinkGroup label="Verify" url="/verify/*">
      <SidebarLink url="/verify/deploy">
        Deploy a Verify & VerifyTier
      </SidebarLink>

      <SidebarLink url="/verify/administer/">Administer a Verify</SidebarLink>

      <SidebarLink url="/verify/list">Browse all Verifies</SidebarLink>

      <SidebarLink url="/verify/verifyTiers/list"
        >Browse all VerifyTiers</SidebarLink
      >
    </SidebarLinkGroup>

    <SidebarLinkGroup label="Deploy ERC20" url="/erc20/*">
      <SidebarLink url="/erc20/deploy">Deploy an ERC20 Token</SidebarLink>

      <SidebarLink url="/erc20/mint/">Mint From An Existing ERC20</SidebarLink>

      <SidebarLink url="/erc20/list/">List ERC20 Tokens</SidebarLink>
    </SidebarLinkGroup>
  </div>
</div>
