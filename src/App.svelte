<script>
  // IMPORT AXIOS
  import axios from "axios";

  // DECLARE VARIABLES
  let datas = [];
  let goodAnswers = [];
  let badAnswers = [];
  let answers = [];
  let randomAnswers = [];
  let good = "nothing";
  let counter = 0;

  // OPEN TRIVIA API URL
  const triviaApi =
    "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple";

  const getData = () => {
    axios.get(triviaApi).then(response => {
      console.log(response.data.results);
      datas = response.data.results[counter].question;
      goodAnswers = response.data.results[counter].correct_answer;
      badAnswers = response.data.results[counter].incorrect_answers;
      answers = badAnswers.concat(goodAnswers);
    });
  };

  function startGame() {
    datas = [];
    goodAnswers = [];
    badAnswers = [];
    answers = [];
    randomAnswers = [];
    good = "nothing";
    counter = 0;
    getData();
  }

  // NEXT QUESTION
  function nextQuestion() {
    if (counter === 4) {
      good = "end";
    } else {
      good = "nothing";
      counter++;
      getData();
    }
  }

  // COMPARE ANSWERS
  function compareAnswers(index) {
    if (index === goodAnswers) {
      good = "good";
    } else {
      good = "wrong";
    }
  }

  // SHUFFLE ARRAY ELEMENTS, RANDOMIZE ANSWERS
  function shuffle(arra1) {
    let ctr = arra1.length;
    let temp;
    let index;

    // While there are elements in the array
    while (ctr > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * ctr);
      // Decrease ctr by 1
      ctr--;
      // And swap the last element with it
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    return arra1;
  }

  // Reactive variable
  $: randomAnswers = shuffle(answers);
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2.5em;
    font-weight: 100;
    margin-bottom: 0;
  }

  .main-title {
    font-size: 4em;
    font-weight: bold;
  }

  .answer-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  button {
    margin: 1em;
  }

  button:hover {
    cursor: pointer;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1 class="main-title">Trivia Game</h1>
  <p>
    Visit the
    <a
      href="https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Quiz-App.md">
      Github page
    </a>
    from project information.
  </p>
  <button on:click={startGame}>Start Quiz</button>
  <hr />
  {#if good !== 'end'}
    <div>
      <h1>Number of Questions: {counter + 1}</h1>
    </div>
    <h1>
      {@html datas}
    </h1>
    <div class="answer-wrapper">
      {#each randomAnswers as answer, index (answer)}
        <button on:click={() => compareAnswers(answer)}>
          {@html answer}
        </button>
      {/each}
    </div>
    {#if good === 'good'}
      <h1>Good Answer!</h1>
      <button on:click={nextQuestion}>Next question</button>
    {:else if good === 'wrong'}
      <h1>Wrong Answer!</h1>
      <button on:click={nextQuestion}>Next question</button>
    {/if}
  {:else if good === 'end'}
    <h1>Game over!!!</h1>
  {/if}
</main>
