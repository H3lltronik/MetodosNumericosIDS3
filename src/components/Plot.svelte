<script lang="ts">
  import { onMount } from "svelte";
  import { Button, Col, Row, TextField } from "svelte-materialify";
  import Plot from "../lib/Charts/Plot";

  import { doTableIteration } from "../lib/implementations";

  let step = 1;
  let iterations = [];
  let range = ["-10", "10"];

  let loadIterations = () => {
    const itResults = doTableIteration(Number(range[0]), Number(range[1]), step);
    iterations = itResults.iterations.reverse();

    console.log("wat", iterations)
    const plot = new Plot(plotEl, iterations.map(it => it.result ), itResults.expression);
  };

  let plotEl = null;
</script>

<Row class="pl-4 pr-4">
  <Col cols={12}>
    <div class="text-h6">Plotting expression {step}</div>
    <Row>
        <Col cols={12} md={4}>
            <TextField
              filled dense
              type="number"
              bind:value={range[0]}
            >
              <span>From</span>
            </TextField>
        </Col>
        <Col cols={12} md={4}>
            <TextField
              filled dense
              type="number"
              bind:value={range[1]}
            >
              <span>To</span>
            </TextField>
        </Col>
        <Col cols={12} md={4}>
            <TextField
              filled dense
              type="number"
              value={step}
              on:input={e => { step = Number(e.target.value ) }}
            >
              <span>Step</span>
            </TextField>
        </Col>
    </Row>
    <Button class="mt-2" on:click={loadIterations}>Plot</Button>
    <canvas bind:this={plotEl} class="plot" />
  </Col>
</Row>
