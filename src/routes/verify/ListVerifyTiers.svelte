<script>
  import { push } from "svelte-spa-router";
  import Button from "../../components/Button.svelte";
  import FormPanel from "../../components/FormPanel.svelte";
  import Switch from "../../components/Switch.svelte";
  import { queryStore } from "@urql/svelte";
  import { formatUnits } from "ethers/lib/utils";
  import { client } from "src/stores";
  import dayjs, { unix } from "dayjs";

  let checked = true;

  $: allVerifyTiers = queryStore({
    client: $client,

    query: `
          query{
            verifyTiers(orderBy: deployTimestamp, orderDirection : desc) {
              address
              deployTimestamp
              deployer
              id
              verifyContract {
                address
                deployTimestamp
                deployer
              }
            }
          }`,
    requestPolicy: "network-only",
    pause: checked ? false : true,
  });
</script>

<div class="flex flex-col py-4">
  <span class="text-white text-2xl">VerifyTiers List</span>
</div>
{#if $allVerifyTiers.fetching}
  Loading...
{:else if $allVerifyTiers.error}
  <span class="text-red-400"
    >Something went wrong, try refreshing the page.</span
  >
{:else}
  <div class="flex flex-col gap-y-3">
    {#each $allVerifyTiers.data.verifyTiers as verifyTier}
      <FormPanel>
        <div class="flex flex-col gap-y-2 mb-4">
          <span class="text-white">VerifyTier Details</span>
          <div class="text-gray-400 flex flex-col">
            <span>Contract Address: {verifyTier.id}</span>
            <span>Deployer: {verifyTier.deployer}</span>
            <span
              >Deployed: {dayjs
                .unix(verifyTier.deployTimestamp)
                .toString()}</span
            >
          </div>
        </div>
        <div class="flex flex-col gap-y-2 mb-4">
          <span class="text-white">Verify Contract Details</span>
          <div class="text-gray-400 flex flex-col">
            <span
              >Verify Contract Address: {verifyTier.verifyContract
                .address}</span
            >
            <span>Deployer: {verifyTier.verifyContract.deployer}</span>
            <span
              >Deployed: {dayjs
                .unix(verifyTier.verifyContract.deployTimestamp)
                .toString()}</span
            >
          </div>
        </div>
        <div class="flex flex-row gap-x-2">
          <Button
            on:click={push(`/verify/verifyTiers/report/${verifyTier.address}`)}
            >Report</Button
          >
        </div>
      </FormPanel>
    {/each}
  </div>
{/if}
