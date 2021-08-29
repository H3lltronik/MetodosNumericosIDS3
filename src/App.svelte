<script lang="ts">
  import logo from './assets/svelte.png'
  import styles from './styles/app.module.scss'
  import { Row, Col, Container, TextField, MaterialApp, Card, AppBar, Radio, Button } from 'svelte-materialify';
  import Configuration from './components/Configuration.svelte';
  import IterationsTable from './components/IterationsTable.svelte';
  import ResultsTable from './components/ResultsTable.svelte';
</script>

<main>
  <MaterialApp>
    <AppBar>
      <span class="text-h5">Metodos numericos</span>
      <div style="flex-grow:1" />
    </AppBar>
    <Container>
      <Row>

        <Col xl={3}>
          <Card>
            <Configuration/>
          </Card>
        </Col>
        <Col xl={2}>
          <Card>
            <IterationsTable/>
          </Card>
        </Col>
        <Col xl={7}>
          <Card>
            <ResultsTable/>
          </Card>
        </Col>

      </Row>
    </Container>
  </MaterialApp>
</main>
