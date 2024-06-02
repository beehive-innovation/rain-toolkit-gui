<script>
  import { push } from "svelte-spa-router";
  import Button from "../../components/Button.svelte";
  import FormPanel from "../../components/FormPanel.svelte";
  import { queryStore } from "@urql/svelte";
  import { formatUnits } from "ethers/lib/utils";
  import { client } from "src/stores";
  import dayjs from "dayjs";
  import Pagination from "src/components/Pagination.svelte";

  const skipLength = 100;
  let skip = 0,
    page = 1,
    saleLength,
    totalSales,
    totalPages;

  $: sales = queryStore({
    client: $client,
    query: `
        query($skip: Int!, $skipLength: Int!) {
          sales(first: $skipLength, skip : $skip) {
            id
            address
            deployBlock
            deployTimestamp
            deployer
            percentRaised
            saleStatus
            totalRaised
            unitsAvailable
            factory {
              childrenCount
            }
            token {
              decimals
            }
            reserve {
              decimals
            }
          }
        }`,
    variables: { skip, skipLength },
  });

  $: if ($sales?.data?.sales) {
    saleLength =
      page == 1
        ? $sales?.data?.sales?.length
        : page == totalPages
        ? skip + $sales?.data?.sales?.length
        : skip + skipLength;
    totalSales = $sales?.data?.sales?.[0]?.factory?.childrenCount;
    totalPages =
      totalSales <= skipLength ? 1 : Math.ceil(totalSales / skipLength);
  }

  const nextPage = () => {
    if (page != totalPages) {
      skip = skip + skipLength;
      page = page + 1;
    }
  };
  const prevPage = () => {
    if (page != 1) {
      skip = skip - skipLength;
      page = page - 1;
    }
  };
  const handleClick = (pageCount) => {
    page = pageCount;
    skip = (pageCount - 1) * skipLength;
  };
</script>

{#if $sales.fetching}
  Loading...
{:else if $sales.error}
  <span class="text-red-400"
    >Something went wrong, try refreshing the page.</span
  >
{:else}
  <Pagination
    {saleLength}
    {totalSales}
    {totalPages}
    {page}
    {prevPage}
    {nextPage}
    {handleClick}
  />
  <div class="flex flex-col gap-y-3">
    {#each $sales.data.sales as sale}
      <FormPanel>
        <div class="flex flex-col gap-y-2 mb-4">
          <span class="text-white">Sale details</span>
          <div class="text-gray-400 flex flex-col">
            <span>Sale Address: {sale.id}</span>
            <span>Deployer: {sale.deployer}</span>
            <span>Deployed: {dayjs.unix(sale.deployTimestamp).toString()}</span>
            <span>Sales Status: {sale.saleStatus}</span>
            <span
              >Total Raised: {Number(
                (+formatUnits(sale.totalRaised, sale.reserve.decimals)).toFixed(
                  4
                )
              )}</span
            >
            <span>Percent Raised: {(+sale.percentRaised).toFixed(4)}%</span>
            <span
              >Available Units: {Number(
                (+formatUnits(
                  sale.unitsAvailable,
                  sale.token.decimals
                )).toFixed(4)
              )}</span
            >
          </div>
        </div>
        <div class="flex flex-row gap-x-2">
          <Button on:click={push(`/sale/purchase/${sale.address}`)}
            >Purchase</Button
          >
        </div>
      </FormPanel>
    {/each}
  </div>
  <Pagination
    classes="mt-5"
    {saleLength}
    {totalSales}
    {totalPages}
    {page}
    {prevPage}
    {nextPage}
    {handleClick}
  />
{/if}
