<script lang="ts">
  import { signer, signerAddress, provider } from "svelte-ethers-store";
  import { ethers } from "ethers";
  import { hexlify } from "ethers/lib/utils";
  import FormPanel from "../../components/FormPanel.svelte";
  import Input from "../../components/Input.svelte";
  import Button from "../../components/Button.svelte";
  import { tierReport } from "../../utils";
  import { push } from "svelte-spa-router";
  import { queryStore } from "@urql/svelte";
  import { VerifyTier } from "rain-sdk";
  import { client } from "src/stores";
  import dayjs from "dayjs";

  export let params, block;

  let verifyTierContract, errorMsg, addressToReport, parsedReport;

  let reportTier;

  let verifyTierAddress = params.wild ? params.wild.toLowerCase() : undefined;

  $: verifyTier = queryStore({
    client: $client,
    query: `
        query ($verifyTierAddress: Bytes!) {
            verifyTiers(where: {id: $verifyTierAddress}) {
              address
              deployTimestamp
              deployer
              id
              verifyContract {
                address
                deployTimestamp
              }
            }
        }`,
    variables: { verifyTierAddress },
    requestPolicy: "network-only",
    pause: params.wild ? false : true,
  });

  $: _verifyTier = $verifyTier.data?.verifyTiers[0];

  $: if (_verifyTier || $signer) {
    if (!$verifyTier.fetching && _verifyTier != undefined) {
      initContracts();
    }
  }

  const initContracts = async () => {
    verifyTierContract = new VerifyTier(_verifyTier?.address, $signer);
  };

  const report = async () => {
    if (ethers.utils.isAddress(addressToReport)) {
      reportTier = await verifyTierContract.report(addressToReport, []);

      parsedReport = tierReport(reportTier);

      block = await $provider.getBlock(parsedReport[0]);
    } else {
      errorMsg = "Not a valid Ethereum address";
    }
  };

  const reportMyAddress = () => {
    addressToReport = $signerAddress;
    report();
  };
</script>

<div class="flex w-full max-w-prose flex-col gap-y-4">
  <div class="mb-2 flex flex-col gap-y-2">
    <span class="text-2xl"> Get a VerifyTiers report. </span>
    <span class="text-gray-400">
      Stake stores the time (block number) when an address joins a tier by
      locking up the required amount of tokens for that tier
    </span>
    {#if !params.wild}
      <span class="text-gray-400">
        Enter a Stake contract address below, or <span
          class="cursor-pointer underline"
          on:click={() => {
            push("/verify/verifyTiers/list");
          }}>browse all deployed VerifyTiers contracts.</span
        >
      </span>
    {/if}
  </div>
  {#if !$verifyTier.fetching && !$verifyTier.error && $verifyTier.data}
    <FormPanel heading="Get a report of an address">
      <Input
        bind:value={addressToReport}
        type="text"
        placeholder="Enter an Ethereum address"
      />

      <div class="flex flex-row gap-x-2">
        <Button shrink disabled={!addressToReport} on:click={report}
          >Get report</Button
        >
        <Button shrink on:click={reportMyAddress}>Get my report</Button>
      </div>
      <div class="flex flex-col gap-y-2">
        <span class="gap-y-1"> VerifyTier Report: </span>
        {#if _verifyTier && parsedReport != undefined}
          {#if reportTier?.toHexString() != "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" && reportTier != undefined}
            Tier set on {dayjs.unix(block?.timestamp).toString()}
          {:else}
            Tier not set
          {/if}
        {/if}
      </div>
    </FormPanel>
  {:else if errorMsg}
    <span class="text-red-400">{errorMsg}</span>
  {:else if !params.wild}
    <FormPanel>
      <Input
        bind:value={verifyTierAddress}
        type="address"
        placeholder="Contract address"
      />
      <Button
        on:click={() => {
          push(`/verify/verifyTiers/report/${verifyTierAddress}`);
        }}
      >
        Load
      </Button>
    </FormPanel>
  {/if}
</div>
