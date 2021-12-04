const reviews = [
  {
    id: 1,
    name: "Angela Coirra",
    job: "web developer",
    img:
      "./photos/photo2.jpg",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus voluptas pariatur eum facilis. Omnis at reiciendis, ex placeat illo molestiae commodi aliquid accusantium adipisci, fugiat quidem atque cum, laborum ea.",
  },
  {
    id: 2,
    name: "Jessica Johndauther",
    job: "web designer",
    img:
      "./photos/photo3.jpg",
    text:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus voluptas pariatur eum facilis. Omnis at reiciendis, ex placeat illo moles",
  },
  {
    id: 3,
    name: "George Horn",
    job: "God Frontend Developer",
    img:
      "./photos/photo1.jpg",
    text:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus voluptas pariatur eum facilis. Omnis at reiciendis, ex placeat illo molestiae commodi aliquid accusantium adipisci, fugiat quidem atque cum, laborum ea. que cum, laborum e",

  },
  {
    id: 4,
    name: "Bill Payman",
    job: "the boss",
    img:
      "./photos/photo4.jpg",
    text:
    "oribus voluptas pariatur eum facilis. Omnis at reiciendis, ex placeat illo molestiae commodi aliquid accusantium adipisci, fugiat quidem atque cum, laborum ea. commodi aliquid accusantium adipisci, fugiat quidem atque cum, laborum ea.",

  },
];

const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

let currentItem = 0;

window.addEventListener("DOMContentLoaded", showPerson(0));
document.querySelector(".next-btn").addEventListener("click", next);
document.querySelector(".prev-btn").addEventListener("click", prev);
document.querySelector(".random-btn").addEventListener("click", showRandom);

function showPerson(index) {
  const item = reviews[index];
  img.src = item.img;
  author.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
}

function next() {
  currentItem++;
  if (currentItem >= reviews.length) {
    currentItem = 0;
  }
  showPerson(currentItem);
}

function prev() {
  currentItem--;
  if (currentItem < 0) {
    currentItem = reviews.length - 1;
  }
  showPerson(currentItem);
}

function showRandom() {
  let newItem = Math.floor(Math.random() * reviews.length);
  while (newItem == currentItem) {
    newItem = Math.floor(Math.random() * reviews.length);
  }
  currentItem = newItem;
  showPerson(currentItem);
}
