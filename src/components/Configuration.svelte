<script>
  import { Row, Col, TextField, Card, Radio, Button } from "svelte-materialify";

  let expression = "x^3 - 5";
  let errorMethod = null;
  let aproxMethod = null;
  let decimals = 3;

  let stopCriteria = null;
  let stopCriteriaVal = null;
  let stopCriteriaMethod = null;
</script>

<Row class="pl-4 pr-4">
  <Col sm={12}>
    <div class="text-h6">Configuration</div>
  </Col>
  <Col sm={12} lg={8}>
    <TextField
      class=""
      filled
      bind:value={expression}
      hint="Mathematical expression"
    >
      <span>Expression</span>
    </TextField>
  </Col>
  <Col sm={12} lg={4}>
    <TextField
      class=""
      filled
      type="number"
      min={0}
      max={100}
      bind:value={decimals}
      hint="Decimal places"
    >
      <span>Precision</span>
    </TextField>
  </Col>
  <Col class="" sm={12}>
    <div class="text-h7 mb-4">
      <strong>Aproximation Method</strong>
    </div>
    <Radio bind:group={errorMethod} value={1}>Bisection</Radio>
  </Col>
  <Col class="" sm={12}>
    <div class="text-h7 mb-4">
      <strong>Error Calculation Method</strong>
    </div>
    <Radio bind:group={aproxMethod} value={1}>Absolute error</Radio>
    <Radio bind:group={aproxMethod} value={2}>Relative error</Radio>
  </Col>
  <Col class="" sm={12}>
    <div class="text-h7 mb-4">
      <strong>Stop criteria method</strong>
    </div>
    <Radio bind:group={stopCriteriaMethod} value={1}>Error</Radio>
    <Radio bind:group={stopCriteriaMethod} value={2}>Iterations</Radio>
  </Col>
  <Col class="" sm={12}>
    <div class="text-h7 mb-4">
      <strong>Stop criteria type</strong>
    </div>
    <Radio bind:group={stopCriteria} value={1}>Greater</Radio>
    <Radio bind:group={stopCriteria} value={2}>Equal</Radio>
    <Radio bind:group={stopCriteria} value={3}>Less</Radio>
  </Col>
  <Col class="" sm={12}>
    <div class="text-h7 mb-4">
      <strong>Stop criteria value</strong>
    </div>
    <TextField
      clearable
      class=""
      filled
      type="number"
      min={0}
      max={1000}
      bind:value={stopCriteriaVal}
    >
      <span>Criteria value</span>
    </TextField>
  </Col>
  <Col sm={12}>
    <Button block>EVALUATE</Button>
  </Col>
</Row>
