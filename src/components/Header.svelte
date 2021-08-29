<script>
    import { AppBar, Button, Col, Icon, Row } from 'svelte-materialify';
    import AppAlerts from './AppAlerts.svelte';
    import { mdiWhiteBalanceSunny, mdiWeatherNight  } from '@mdi/js'
    import { theme as themeStore } from '../store';
    import { get } from 'svelte/store';

    let icon = mdiWhiteBalanceSunny;
    $: {
        const theme = $themeStore
        icon = (theme == 'light')? mdiWeatherNight : mdiWhiteBalanceSunny;
    }

    const toggleTheme = () => {
        const theme = get(themeStore)
        let themeName = (theme == 'light')? "dark":"light";
        
        themeStore.set(themeName);
    }
</script>

<AppBar>
    <span class="text-h5">Metodos numericos</span>
    <div style="flex-grow:1" />
    <div class="link">
        <a class="buy-me-a-coffee" target="_blank" href="https://www.buymeacoffee.com/h3lltronik"></a>
        <a class="github" target="_blank" href="https://github.com/H3lltronik/MetodosNumericosIDS3"></a>
        <Button fab size="small" class="deep-purple white-text" on:click={toggleTheme}>
            <Icon path={icon} />
        </Button>
    </div>
</AppBar>

<Row style="justify-content: center;">
    <Col cols={10}>
        <AppAlerts></AppAlerts>
    </Col>
</Row>