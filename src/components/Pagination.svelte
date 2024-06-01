<!-- class="underline hover:text-sky-400 cursor-pointer text-base hover:text-sm" -->
<script lang="ts">
  import IconLibrary from "./IconLibrary.svelte";

  export let prevPage: undefined | any = (method) => {};
  export let nextPage: undefined | any = (method) => {};
  export let handleClick: undefined | any = (method) => {};
  export let classes: undefined | any;
  export let saleLength, totalSales, totalPages, page;
  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
</script>

<div
  class={classes
    ? `grid grid-cols-3 gap-2 w-full mb-4 ${classes}`
    : `grid grid-cols-3 gap-2 w-full mb-4`}
>
  <div class="flex flex-col gap-y-2" />
  <div class="flex gap-y-2 items-center justify-center">
    <button
      class="cursor-pointer hover:text-zinc-800 hover:bg-gray-100 py-1.5 px-2 rounded-md"
      on:click={prevPage}
      disabled={page == 1}
    >
      <IconLibrary icon="left-arrow" color="font-gray-100" width="24" /></button
    >
    <span class="flex gap-y-2 items-center justify-center">
      {#if totalPages <= 7}
        {#each Array(totalPages) as _, i}
          <span class="pagination">
            <a
              class={page == i + 1 ? "active" : ""}
              on:click={() => {
                handleClick(i + 1);
              }}
              >{i + 1}
            </a></span
          >
        {/each}
      {:else}
        {#each range(page - 2, page + 2, 1) as index, i}
          {#if i == 0 && index > 1}
            <span class="px-2"> ... </span>
          {/if}
          {#if index > 0 && index <= totalPages}
            <span class="pagination">
              <a
                class={page == index ? "active" : ""}
                on:click={() => {
                  handleClick(index);
                }}
                >{index}
              </a></span
            >
          {/if}
          {#if i == 4 && index < totalPages}
            <span class="px-2">...</span>
          {/if}
        {/each}
      {/if}
    </span>
    <button
      class="cursor-pointer hover:text-zinc-800 hover:bg-gray-100 py-1.5 px-2 rounded-md"
      on:click={nextPage}
      disabled={page == totalPages}
    >
      <IconLibrary
        icon="right-arrow"
        color="font-gray-100 "
        width="24"
      /></button
    >
  </div>
  <div class="flex flex-col gap-y-2 items-end mr-2.5 justify-center">
    {saleLength} of {totalSales}
  </div>
</div>

<style>
  .pagination a {
    cursor: pointer;
    padding: 8px 16px;
    margin: 0px 3px;
    text-decoration: none;
    transition: "background-color 0.3s";
    border-radius: 6px;
  }
  .pagination a.active {
    background-color: dodgerblue;
    color: white;
  }
  .pagination a:hover:not(.active) {
    background-color: #ddd;
    color: #262626;
  }
  .icons svg {
    cursor: pointer;
    padding: 8px 16px;
    margin: 0px 3px;
    text-decoration: none;
    transition: "background-color 0.3s";
    border-radius: 5px;
  }
</style>
