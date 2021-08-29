<script lang="ts">
    import { Alert, Icon } from "svelte-materialify";
    import { mdiAlert } from '@mdi/js';
    import { appAlerts } from "../store/index";
    import { get } from "svelte/store";
    

    let deleteAlert = (id: number) => {
        const currAlerts = get(appAlerts);
        const indexToDel = currAlerts.findIndex(el => {
            return el.id == id
        })
        currAlerts.splice(indexToDel, 1);
        appAlerts.set(currAlerts);
    }
</script>

<div>
  {#each $appAlerts as appAlert}
  <div class="cursor-pointer" on:click={() => deleteAlert(appAlert.id)}>
    <Alert class="error-text" text dense>
      <div slot="icon">
        <Icon path={mdiAlert} />
      </div>
      <div class="text-h6">Error</div>
      {appAlert.text}. <small>(Click to dismiss)</small>
    </Alert>
  </div>
  {/each}
</div>
