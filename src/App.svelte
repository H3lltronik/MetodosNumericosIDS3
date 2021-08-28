<script lang="ts">
  import logo from './assets/svelte.png'
  import styles from './styles/app.module.scss'
  import { Row, Col, Container, TextField, MaterialApp, Card, AppBar, Radio, Button } from 'svelte-materialify';

  import Calculator, { MethodStopCondition, MethodStopType } from './lib/Calculator/Calculator';
  import MathParser from './lib/MathParser/MathParser';
  import RelativeError from './lib/Error/RelativeError/RelativeError';
  import Biseccion from './lib/methods/Biseccion';
import Configuration from './components/Configuration.svelte';
import IterationsTable from './components/IterationsTable.svelte';
import ResultsTable from './components/ResultsTable.svelte';

  let expression = "x^3 - 5";
  const mathParser = new MathParser();
  mathParser.setFixedDecimals(3);

  const calculator = new Calculator(mathParser);
  const relativeError = new RelativeError(mathParser);
  const biseccion = new Biseccion(mathParser, expression, 'x');

  calculator.setExpression(expression);
  calculator.setAproxMethod(biseccion);
  calculator.setErrorMethod(relativeError);
  // const iterations = calculator.iterate(-3, 3, 1, 'x');

  calculator.setStartPoint({negativeXValue: 1, positiveXValue: 2});
  calculator.setStopCondition(MethodStopType.Iterations, MethodStopCondition.Greater, 3);
  // calculator.beginExecution();
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
