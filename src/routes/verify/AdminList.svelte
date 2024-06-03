<script lang="ts">
  import { formatAddress } from "src/utils";

  export let admins, heading;
</script>

<div class="w-1/3">
  <table class="table-auto w-full space-y-2 text-sm">
    <tr class="border-b border-gray-600 uppercase text-sm">
      <th class="text-gray-400 text-left pb-2 font-light">{heading}</th>
    </tr>
    {#each admins as admin}
      <tr>
        <td class="py-2">
          Address: {formatAddress(admin.address)}
        </td>
      </tr>
    {/each}
  </table>
</div>
