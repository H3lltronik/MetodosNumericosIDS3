<script lang="ts">
    import { Button, Icon } from "svelte-materialify";
    import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let isShowing = true;
    
    $: icon = isShowing? mdiEyeOffOutline : mdiEyeOutline;

    let toggleShowing = () => {
        isShowing = !isShowing;
        dispatch("toggleShowing", {isShowing})
    }
</script>

<div>
    <Button fab on:click={toggleShowing} size="x-small">
        <Icon path={icon}></Icon>
    </Button>
</div>