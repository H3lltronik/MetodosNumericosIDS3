<script lang="ts">
    import { varToItOver, iterationStep } from "../store";
    import { Row, Col, TextField, Card, Radio, Button, DataTable, DataTableHead, DataTableRow, DataTableCell, DataTableBody, } from "svelte-materialify";
    import {doTableIteration} from "../lib/implementations"

    let range = ["-3", "3"];
    let step = 1;

    let iterations: IterationResult[] = []
    let expressionUsed = "";

    let loadIterations = () => {
      const itResults = doTableIteration(
        Number(range[0]),
        Number(range[1]),
        step
      );
      if(!itResults) return
      iterations = itResults.iterations.reverse();
      expressionUsed = itResults.expression;
    }
  </script>
  
<Row class="pl-4 pr-4">
  <Col cols={12}>
    <div class="text-h6">Iterations table</div>
  </Col>
  <Col cols={6}>
      <TextField
        filled dense
        type="number"
        bind:value={range[0]}
      >
        <span>From</span>
      </TextField>
  </Col>
  <Col cols={6}>
      <TextField
        filled dense
        type="number"
        bind:value={range[1]}
      >
        <span>To</span>
      </TextField>
  </Col>
  <Col cols={6}>
      <TextField
        filled dense
        type="number"
        value={step}
        on:input={e => { step = Number(e.target.value ) }}
      >
        <span>Step</span>
      </TextField>
  </Col>
  <Col cols={6}>
      <TextField
        filled dense
        bind:value={$varToItOver}
        counter={1}
      >
        <span>Variable</span>
      </TextField>
  </Col>
  <Col cols={12}>
      <Button block on:click={loadIterations}>GO</Button>
  </Col>
  <Col cols={12}>
    <Row style="justify-content: center;">
      {#if iterations.length > 0}
      <Col cols={12}>
        <colsall class="">Evaluating 
          <strong>{expressionUsed}</strong> from 
          <strong>{range[0]}</strong> to 
          <strong>{range[1]}</strong> on 
          <strong>{$varToItOver}</strong>:
        </colsall>
      </Col>
        
        <DataTable>
            <DataTableHead>
              <DataTableRow>
                <DataTableCell numeric>X</DataTableCell>
                <DataTableCell numeric>Y</DataTableCell>
              </DataTableRow>
            </DataTableHead>
            <DataTableBody>
              {#each iterations as iteration}
                <DataTableRow>
                  <DataTableCell numeric>{iteration.input}</DataTableCell>
                  <DataTableCell numeric>{iteration.result}</DataTableCell>
                </DataTableRow>
              {/each}

            </DataTableBody>
        </DataTable>
      {:else}
        <div class="text-h5">No iterations yet</div>
      {/if}
    </Row>
  </Col>
</Row>
  