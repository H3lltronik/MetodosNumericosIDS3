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

  let values: ClosedIntervalPayload = {
    negativeXValue: 2,
    positiveXValue: 3,
  };
  let results: ResultsTable|undefined = {headers: [], rows: []};

  let doCalculus = () => {
    const res = doResultCalculus(values);
    if(!res) return
    results = res
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
  {#if results}
    <Col cols={12} class="results-table_container">
      <DataTable class="results-table">
        <DataTableHead>
          <DataTableRow>
            {#each results.headers as header}
              <DataTableCell class="text-nowrap" numeric>{header}</DataTableCell>
            {/each}
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          {#each results.rows as row, i}
          <DataTableRow>
                {#each row as rowItem}
                  <DataTableCell numeric>{rowItem.value}</DataTableCell>
                {/each}
              </DataTableRow>
          {/each}
        </DataTableBody>
      </DataTable>
    </Col>
  {/if}
</Row>