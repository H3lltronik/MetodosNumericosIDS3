<script lang="ts">
  import logo from './assets/svelte.png'
  import styles from './styles/app.module.scss'

  import Calculator, { MethodStopCondition, MethodStopType } from './lib/Calculator/Calculator';
  import MathParser from './lib/MathParser/MathParser';
  import RelativeError from './lib/Error/RelativeError/RelativeError';
  import Biseccion from './lib/methods/Biseccion';

  const expression = "x-4sin(x)";
  const mathParser = new MathParser();
  mathParser.setFixedDecimals(3);

  const calculator = new Calculator(mathParser);
  const relativeError = new RelativeError();
  const biseccion = new Biseccion(mathParser, expression, 'x');

  calculator.setExpression(expression);
  calculator.setAproxMethod(biseccion);
  calculator.setErrorMethod(relativeError);
  const iterations = calculator.iterate(-3, 3, 1, 'x');

  console.log("iterations", iterations);

  calculator.setStartPoint({negativeXValue: 1, positiveXValue: -1});
  calculator.setStopCondition(MethodStopType.Iterations, MethodStopCondition.Greater, 4);
  calculator.beginExecution();
</script>

<main>
  <h1>a</h1>
  <div class={styles.test}>
    <p>ALKSDASKDAKL</p>
    <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla temporibus quisquam pariatur reprehenderit sint. Eveniet quaerat voluptate fuga laborum in, iusto fugiat ducimus explicabo! Obcaecati et cum minima deleniti magnam!</h3>
  </div>
</main>
