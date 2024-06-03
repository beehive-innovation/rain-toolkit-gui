<script>
  import { push } from "svelte-spa-router";
  import Button from "../../components/Button.svelte";
  import FormPanel from "../../components/FormPanel.svelte";
  import { queryStore } from "@urql/svelte";
  import { client } from "src/stores";
  import dayjs, { unix } from "dayjs";
  import { signerAddress } from "svelte-ethers-store";
  import AdminList from "./AdminList.svelte";
  import { slide } from "svelte/transition";
  import IconLibrary from "../../components/IconLibrary.svelte";

  let checked = true;

  $: allVerifies = queryStore({
    client: $client,

    query: `
          query{
            verifies(orderBy: deployTimestamp, orderDirection : desc) {
              address
              deployBlock
              deployTimestamp
              deployer
              id
              verifyEventCount
              approverAdmins {
                roles
                address
                status
              }
              bannerAdmins {
                address
                roles
                status
              }
              removerAdmins {
                address
                roles
                status
              }
            }
          }`,
    requestPolicy: "network-only",
    pause: checked ? false : true,
  });
  let value;
  const handleClick = (payload) => {
    // 	現状開いてる場合は閉じる
    value = payload === value ? "" : payload;
  };
</script>

<div class="flex flex-col py-4">
  <span class="text-white text-2xl">Verifies List</span>
</div>
{#if $allVerifies.fetching}
  Loading...
{:else if $allVerifies.error}
  <span class="text-red-400"
    >Something went wrong, try refreshing the page.</span
  >
{:else}
  <div class="flex flex-col gap-y-3">
    {#each $allVerifies.data.verifies as verify, i}
      <FormPanel classes="w-full">
        <div class="flex flex-col gap-y-2 mb-4 ">
          <span class="text-white">Verify Contract Details</span>
          <div class="text-gray-400 flex flex-col">
            <span>Contract Address: {verify.id}</span>
            <span>Deployer: {verify.deployer}</span>
            <span
              >Deployed: {dayjs.unix(verify.deployTimestamp).toString()}</span
            >
          </div>
        </div>
        <div class="flex flex-col gap-y-2 mb-4 w-full">
          <span
            class="text-white cursor-pointer"
            on:click={() => {
              handleClick(i);
            }}
            >Admins Details {#if value !== i}
              <IconLibrary inline icon="plus" width={25} />
            {:else}
              <IconLibrary inline icon="dash" width={25} />
            {/if}</span
          >
          {#if value === i}
            <div
              class="flex flex-row gap-y-2 mb-4"
              id="collapse"
              transition:slide={{ duration: 400 }}
            >
              <AdminList
                admins={verify.approverAdmins}
                heading="Approver Admins"
              />
              <AdminList admins={verify.bannerAdmins} heading="Banner Admins" />
              <AdminList
                admins={verify.removerAdmins}
                heading="Remover Admins"
              />
            </div>
          {/if}
        </div>

        {#if verify.deployer == $signerAddress.toLowerCase() || verify.approverAdmins.some((obj) => obj.address == $signerAddress.toLowerCase()) || verify.bannerAdmins.some((obj) => obj.address == $signerAddress.toLowerCase()) || verify.removerAdmins.some((obj) => obj.address == $signerAddress.toLowerCase())}
          <div class="flex flex-row gap-x-2">
            <Button on:click={push(`/verify/administer/${verify.address}`)}
              >Manage</Button
            >
          </div>
        {/if}
      </FormPanel>
    {/each}
  </div>
{/if}
