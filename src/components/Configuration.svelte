<script>
  import { Row, Col, TextField, Card, Radio, Button } from "svelte-materialify";
  import {expression, fixedDecimals, errorMethod, aproxMethod, stopCriteria, stopCriteriaVal, stopCriteriaMethod,} from "../store/index"
  import {MethodStopType, MethodStopCondition, AproxMethodType, ErrorMethodType} from '../lib/Calculator/Calculator'
  import ToggleEyeIcon from "./ToggleEyeIcon.svelte";
  let isShowing = true;

</script>

<Row class="pl-4 pr-4">
  <Col cols={12}>
    <Row>
      <div class="text-h6 ml-3 mr-4">Configuration</div>
      <ToggleEyeIcon on:toggleShowing={ e => isShowing = e.detail.isShowing }/>
    </Row>
  </Col>
  {#if isShowing}
    <Col cols={12}>
      <Row>
        <Col cols={12} lg={8}>
          <TextField
            class=""
            filled
            bind:value={$expression}
            hint="Mathematical expression"
          >
            <span>Expression</span>
          </TextField>
        </Col>
        <Col cols={12} lg={4}>
          <TextField
            class=""
            filled
            type="number"
            min={0}
            max={100}
            bind:value={$fixedDecimals}
            hint="Decimal places"
          >
            <span>Precision</span>
          </TextField>
        </Col>
        <Col class="" cols={12}>
          <div class="text-h7 mb-4">
            <strong>Aproximation Method</strong>
          </div>
          <Radio bind:group={$aproxMethod} value={AproxMethodType.Biseccion}>Biseccion</Radio>
          <Radio bind:group={$aproxMethod} value={AproxMethodType.ReglaFalsa}>Regla Falsa</Radio>
          <Radio bind:group={$aproxMethod} value={AproxMethodType.NewtonRaphson}>Newton Raphson</Radio>
          <Radio bind:group={$aproxMethod} value={AproxMethodType.Secante}>Secante</Radio>
        </Col>
        <Col class="" cols={12}>
          <div class="text-h7 mb-4">
            <strong>Error Calculation Method</strong>
          </div>
          <Radio bind:group={$errorMethod} value={ErrorMethodType.Absolute}>Absolute error</Radio>
          <Radio bind:group={$errorMethod} value={ErrorMethodType.Relative}>Relative error</Radio>
        </Col>
        <Col class="" cols={12}>
          <div class="text-h7 mb-4">
            <strong>Stop criteria method</strong>
          </div>
          <Radio bind:group={$stopCriteriaMethod} value={MethodStopType.Error}>Error</Radio>
          <Radio bind:group={$stopCriteriaMethod} value={MethodStopType.Iterations}>Iterations</Radio>
        </Col>
        <Col class="" cols={12}>
          <div class="text-h7 mb-4">
            <strong>Stop criteria type</strong>
          </div>
          <Radio bind:group={$stopCriteria} value={MethodStopCondition.Greater}>Greater</Radio>
          <Radio bind:group={$stopCriteria} value={MethodStopCondition.Equal}>Equal</Radio>
          <Radio bind:group={$stopCriteria} value={MethodStopCondition.Less}>Less</Radio>
        </Col>
        <Col class="" cols={12}>
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
            bind:value={$stopCriteriaVal}
          >
            <span>Criteria value</span>
          </TextField>
        </Col>
      </Row>
    </Col>
  {/if}
</Row>
