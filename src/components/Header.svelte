<script>
    import { AppBar, Col, Row } from 'svelte-materialify';
    import AppAlerts from './AppAlerts.svelte';
</script>

<AppBar>
    <span class="text-h5">Metodos numericos</span>
    <div style="flex-grow:1" />
    <div class="link">
        <a class="buy-me-a-coffee" target="_blank" href="https://www.buymeacoffee.com/h3lltronik"></a>
        <a class="github" target="_blank" href="https://github.com/H3lltronik/MetodosNumericosIDS3"></a>
    </div>
</AppBar>

<Row style="justify-content: center;">
    <Col cols={10}>
        <AppAlerts></AppAlerts>
    </Col>
</Row>