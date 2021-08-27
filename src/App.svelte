<script lang="ts">
  import logo from './assets/svelte.png'
  import styles from './styles/app.module.scss'

  import Calculator from './lib/Calculator/Calculator';
  import MathParser from './lib/MathParser/MathParser';

  const mathParser = new MathParser();
  mathParser.setExpression("cos(45 deg)");
  console.log("res full", mathParser.execute() );
  console.log("res rounded", mathParser.execute(6) );
  
</script>

<main>
  <h1>a</h1>
  <div class={styles.test}>
    <p>ALKSDASKDAKL</p>
    <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla temporibus quisquam pariatur reprehenderit sint. Eveniet quaerat voluptate fuga laborum in, iusto fugiat ducimus explicabo! Obcaecati et cum minima deleniti magnam!</h3>
  </div>
</main>
