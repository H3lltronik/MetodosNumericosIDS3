<script lang="ts">
  import { addAlert, doResultCalculus } from "../lib/implementations";
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
  import { aproxMethod as aproxMethodStore } from "../store";
  import { AproxMethodType } from "../lib/Calculator/Calculator";
  import ToggleEyeIcon from "./ToggleEyeIcon.svelte";
  let isShowing = true;

  const initialValues: ApproximationPayload = {
    negativeXValue: null,
    positiveXValue: null,
    start: null,
  };
  let values: ApproximationPayload = {...initialValues};
  let results: ResultsTable|undefined = {headers: [], rows: []};

  let doCalculus = () => {
    if (
      (!values.negativeXValue || !values.positiveXValue)
      || !values.start
    ) {
      addAlert({ id: Date.now(), text: "Fill the initial values to begin", type: 'error' })
      return
    }

    const res = doResultCalculus(values);
    if(!res) return
    results = res
  };

  let isOpened = null
  let isClosed = null

  $: {
    isOpened = $aproxMethodStore == AproxMethodType.Biseccion || $aproxMethodStore == AproxMethodType.ReglaFalsa || $aproxMethodStore == AproxMethodType.Secante
    isClosed = $aproxMethodStore == AproxMethodType.NewtonRaphson

    values = {...initialValues}
  }
</script>

<Row class="pl-4 pr-4">
  <Col cols={12}>
    
    <Row>
      <div class="text-h6 ml-3 mr-4">Evaluations table</div>
      <ToggleEyeIcon on:toggleShowing={ e => isShowing = e.detail.isShowing }/>
    </Row>

    {#if isShowing}
      <Row style="align-items: center;">
        {#if isOpened }
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
        {:else if isClosed }
          <Col cols={12} md={4}>
            <TextField
              class=""
              filled
              type="number"
              bind:value={values.start}
            >
              <span>Start value</span>
            </TextField>
          </Col>
        {:else}
          <div class="text-h6">Invalid method</div>
        {/if}
        


        <Col cols={12} md={4}>
          <Button on:click={doCalculus}>EVALUATE</Button>
        </Col>
      </Row>
    {/if}
  </Col>
  {#if results && isShowing}
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