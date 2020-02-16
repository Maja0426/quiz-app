const triviaApi =
  "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple";

const sendHttpRequest = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: data ? { "Content-Type": "application/json" } : {}
  }).then(response => {
    if (response.status >= 400) {
      return response.json().then(errResData => {
        const error = new Error("Something went wrong!");
        error.data = errResData;
        throw error;
      });
    }
    return response.json();
  });
};

const getData = () => {
  sendHttpRequest("GET", triviaApi).then(responseData => {
    console.log(JSON.stringify(responseData));
  });
};
