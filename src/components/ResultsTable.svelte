<script lang="ts">
  import { doResultCalculus } from "../lib/implementations";
  import {
    Row,
    Col,
    TextField,
    Card,
    Radio,
    Button,
    DataTable,
    DataTableHead,
    DataTableRow,
    DataTableCell,
    DataTableBody,
  } from "svelte-materialify";
import { calculusIterationResults } from "../store";

  let values: AproxType = {
    negativeXValue: 2,
    positiveXValue: 3,
  };
  let results: CalculusIterationsResult|undefined = [];

  let doCalculus = () => {
    const res = doResultCalculus(values);
    if(!res) return
    results = res
    calculusIterationResults.set(results);
  };
</script>

<Row class="pl-4 pr-4">
  <Col cols={12}>
    <div class="text-h6">Evaluations table</div>

    <Row style="align-items: center;">
      <Col cols={12} md={4}>
        <TextField
          class=""
          filled
          type="number"
          bind:value={values.negativeXValue}
        >
          <span>Negative initial value</span>
        </TextField>
      </Col>
      <Col cols={12} md={4}>
        <TextField
          class=""
          filled
          type="number"
          bind:value={values.positiveXValue}
        >
          <span>Positive initial value</span>
        </TextField>
      </Col>
      <Col cols={12} md={4}>
        <Button on:click={doCalculus}>EVALUATE</Button>
      </Col>
    </Row>
  </Col>
  <Col cols={12} class="results-table_container">
    <DataTable class="results-table">
      <DataTableHead>
        <DataTableRow>
          <DataTableCell class="text-nowrap" numeric>N</DataTableCell>
          <DataTableCell class="text-nowrap" numeric>Negative X</DataTableCell>
          <DataTableCell class="text-nowrap" numeric>F(NegX)</DataTableCell>
          <DataTableCell class="text-nowrap" numeric>Positive X</DataTableCell>
          <DataTableCell class="text-nowrap" numeric>F(PosX)</DataTableCell>
          <DataTableCell class="text-nowrap" numeric>Aproximation</DataTableCell>
          <DataTableCell class="text-nowrap" numeric>F(Aprox)</DataTableCell>
          <DataTableCell class="text-nowrap" numeric>Error</DataTableCell>
        </DataTableRow>
      </DataTableHead>
      <DataTableBody>
        {#each results as result, i}
          <DataTableRow>
            <DataTableCell numeric>{i}</DataTableCell>
            <DataTableCell numeric>{result.currNegativeXValue}</DataTableCell>
            <DataTableCell numeric>{result.evaluatedCurrNeg}</DataTableCell>
            <DataTableCell numeric>{result.currPositiveXValue}</DataTableCell>
            <DataTableCell numeric>{result.evaluatedCurrPos}</DataTableCell>
            <DataTableCell numeric>{result.aproxResult}</DataTableCell>
            <DataTableCell numeric>{result.expressionResult}</DataTableCell>
            <DataTableCell numeric>{result.error}</DataTableCell>
          </DataTableRow>
        {/each}
      </DataTableBody>
    </DataTable>
  </Col>
</Row>