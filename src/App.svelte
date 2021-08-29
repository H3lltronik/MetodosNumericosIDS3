<script lang="ts">
  import { Card,Col,Container,MaterialApp,Row } from 'svelte-materialify';
  import Configuration from './components/Configuration.svelte';
  import IterationsTable from './components/IterationsTable.svelte';
  import Plot from './components/Plot.svelte';
  import ResultsTable from './components/ResultsTable.svelte';
  import Header from './components/Header.svelte';
  import { theme } from './store/index';
</script>

<main>
  <MaterialApp theme={$theme}>
    <Header/>
    <Container>
      <Row>
        <Col cols={12} lg={3} xl={3}>
          <Card>
            <Configuration/>
          </Card>
        </Col>
        <Col cols={12} lg={3} xl={2}>
          <Card>
            <IterationsTable/>
          </Card>
        </Col>
        <Col cols={12} lg={12} xl={7}>
          <Card>
            <ResultsTable/>
          </Card>
        </Col>
        <Col cols={12} lg={12} xl={12}>
          <Card>
            <Plot/>
          </Card>
        </Col>
      </Row>
    </Container>
  </MaterialApp>
</main>
