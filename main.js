const postContainer = document.querySelector("#post-container");

const filter = document.getElementById("filter");
const loader = document.querySelector(".loader");

let limit = 5;
let page = 1;

// fetch posts from API
async function getData() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const fetchedData = await res.json();

  console.log(fetchedData);
  return fetchedData;
}

// Show posts in DOM
async function showPost() {
  const post = await getData();

  post.forEach((post) => {
    let div = document.createElement("div");
    div.classList.add("post");
    div.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
    </div>`;

    postContainer.appendChild(div);
  });
}

function showLoader() {
  loader.classList.add("show");

  setTimeout(() => {
    loader.classList.remove("show");

    setTimeout(() => {
      page++;
      showPost();
    }, 300);
  }, 1000);
}

function filterPost(e) {
  let posts = document.querySelectorAll(".post");
  let search = e.target.value.toUpperCase();
  console.log(search);

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();

    const body = post.querySelector(".post-body").innerText.toUpperCase();

    console.log(title);
    if (title.indexOf(search) > -1 || body.indexOf(search) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoader();
  }
});

filter.addEventListener("keyup", filterPost);

showPost();
