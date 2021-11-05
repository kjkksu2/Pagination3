const articleList = [
  "article 1",
  "article 2",
  "article 3",
  "article 4",
  "article 5",
  "article 6",
  "article 7",
  "article 8",
  "article 9",
  "article 10",
  "article 11",
  "article 12",
  "article 13",
  "article 14",
  "article 15",
  "article 16",
  "article 17",
  "article 18",
  "article 19",
  "article 20",
  "article 21",
  "article 22",
];

const params = {
  numberOfArticles: articleList.length,
  articlesPerPage: 3,
  currentPage: 1,
  numberOfButtons: 5,
};

function pagination(items, params) {
  const { numberOfArticles, articlesPerPage, currentPage, numberOfButtons } =
    params;

  const totalButtons = Math.ceil(numberOfArticles / articlesPerPage);

  if (currentPage < 1 || currentPage > totalButtons) {
    alert("Set current page correctly.");
    return;
  }

  const buttons = Array(totalButtons)
    .fill(1)
    .map((e, i) => e + i);
  const sideButtons =
    numberOfButtons % 2 == 0 ? numberOfButtons / 2 : (numberOfButtons - 1) / 2;

  function calculLeft(rest = 0) {
    return {
      array: buttons
        .slice(0, currentPage - 1)
        .reverse()
        .slice(0, sideButtons + rest)
        .reverse(),

      rest_length: function () {
        return sideButtons - this.array.length;
      },
    };
  }

  function calculRight(rest = 0) {
    return {
      array: buttons.slice(currentPage).slice(0, sideButtons + rest),

      rest_length: function () {
        return sideButtons - this.array.length;
      },
    };
  }

  const leftButtons = calculLeft(calculRight().rest_length()).array;
  const rightButtons = calculRight(calculLeft().rest_length()).array;

  const paginatedButtons = [...leftButtons, currentPage, ...rightButtons];

  const numbers = document.querySelector(".pagination .numbers");
  numbers.innerHTML = "";
  for (let i = 0; i < paginatedButtons.length; i++) {
    const button = document.createElement("button");
    button.innerText = paginatedButtons[i];

    if (paginatedButtons[i] === currentPage) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      params.currentPage = parseInt(button.innerText);
      showArticles(items, params);
    });

    numbers.appendChild(button);
  }
}

function showArticles(items, { articlesPerPage, currentPage }) {
  const start = (currentPage - 1) * articlesPerPage;
  const end = currentPage * articlesPerPage;

  const articles = items.slice(start, end);

  const articlesDiv = document.querySelector(".articles");
  articlesDiv.innerHTML = "";
  for (let i = 0; i < articles.length; i++) {
    const li = document.createElement("li");
    li.innerText = articles[i];
    articlesDiv.appendChild(li);
  }

  pagination(items, params);
}

function initPrevAndNext(items, params) {
  const prev = document.querySelector(".pagination .prev");
  const next = document.querySelector(".pagination .next");

  prev.addEventListener("click", () => {
    if (params.currentPage > 1) {
      params.currentPage -= 1;
      showArticles(items, params);
    }
  });

  const totalPages = Math.ceil(
    params.numberOfArticles / params.articlesPerPage
  );

  next.addEventListener("click", () => {
    if (params.currentPage < totalPages) {
      params.currentPage += 1;
      showArticles(items, params);
    }
  });
}

initPrevAndNext(articleList, params);
showArticles(articleList, params);
