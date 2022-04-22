function generateAdvice() {
  axios('https://api.adviceslip.com/advice')
  .then((res) => {
    const advice = res.data.slip.advice;
    const advice_id = res.data.slip.id;

    document.getElementById('advice').innerHTML = advice;
    document.getElementById('advice_id').innerHTML = advice_id;
  }).catch((err) => {
    console.log(err);
  });
}

generateAdvice()