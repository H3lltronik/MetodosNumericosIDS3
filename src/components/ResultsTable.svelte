<script lang="ts">
  import { doResultCalculus } from "../lib/implementations";
  import { Row, Col, TextField, Card, Radio, Button, DataTable, DataTableHead, DataTableRow, DataTableCell, DataTableBody, } from "svelte-materialify";
  
  let values: AproxType = {
    negativeXValue: 1,
    positiveXValue: 2
  };
  let results: CalculusIterationsResult = [];

  let doCalculus = () => {
    results = doResultCalculus (values);
  }
</script>
  
  <Row class="pl-4 pr-4">
    <Col sm={12}>
      <div class="text-h6">Evaluations table</div>

      <Row style="align-items: center;">
        <Col>
          <TextField
            class=""
            filled
            type=number
            bind:value={values.negativeXValue}
          >
            <span>Negative initial value</span>
          </TextField>
        </Col>
        <Col>
          <TextField
            class=""
            filled
            type=number
            bind:value={values.positiveXValue}
          >
            <span>Positive initial value</span>
          </TextField>
        </Col>
        <Col>
          <Button on:click={doCalculus}>EVALUATE</Button>
        </Col>
      </Row>
    </Col>
    <Col sm={12}>
      <DataTable>
        <DataTableHead>
          <DataTableRow>
            <DataTableCell numeric>N</DataTableCell>
            <DataTableCell numeric>Negative X</DataTableCell>
            <DataTableCell numeric>F(NegX)</DataTableCell>
            <DataTableCell numeric>Positive X</DataTableCell>
            <DataTableCell numeric>F(PosX)</DataTableCell>
            <DataTableCell numeric>Aproximation</DataTableCell>
            <DataTableCell numeric>F(Aprox)</DataTableCell>
            <DataTableCell numeric>Error</DataTableCell>
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
  