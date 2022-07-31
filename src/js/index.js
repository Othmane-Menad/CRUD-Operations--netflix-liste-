import "../style/style.scss";
import { getData, postData, deleteData, putData } from "./http.js";
import { populateTable } from "./ui.js";

// Listener for when page load
document.addEventListener("DOMContentLoaded", loadData);

// Listener for the add button
const btn = document.querySelector("#btn").addEventListener("click", addData);

// Listener for Search input
const search = document
  .querySelector("#search")
  .addEventListener("keyup", searching);

// Listener for delete button parent element
const tbody = document
  .querySelector("#tbody")
  .addEventListener("click", removePost);

// Get data from Api and populate in the table
function loadData() {
  getData()
    .then((data) => {
      populateTable(data);
    })
    .catch((err) => {
      console.log("Error while filling table", err);
    });
}

// Add data from inputs to the table
function addData(e) {
  const show_id = document.querySelector(".id").value;
  const type = document.querySelector(".type").value;
  const title = document.querySelector(".title").value;
  const director = document.querySelector(".director").value;
  const release_year = document.querySelector(".release_date").value;

  const data = {
    show_id: show_id,
    type: type,
    title: title,
    director: director,
    release_year: release_year,
  };

  postData(data)
    .then((data) => {
      loadData();
    })
    .catch((err) => console.log("error while posting data: ", err));
  e.preventDefault();
}

// Search
function searching(e) {
  let data = e.target.value;
  const allData = [];

  getData().then((element) => {
    // initial idea was to deep copy the whole array of object into a new array then filter from there
    // could not deep copy the object array getting a weird array where you can't myArray[0]
    const filteredData = searchTable(data, element);

    populateTable(filteredData);
  });

  e.preventDefault();
}
function searchTable(value, data) {
  const filteredData = [];
  data.map((element) => {
    value = value.toLowerCase();

    let title = element.title.toLowerCase();
    if (title.includes(value)) {
      filteredData.push(element);
    }
  });
  return filteredData;
}

// Delete Post
function removePost(e) {
  e.preventDefault();
  // Checking if the parent has a child with delete class
  if (e.target.classList.contains("delete")) {
    // Get the id of the poste which we set as data-id in the ui showPosts function
    // parent element is the a
    const id = e.target.dataset.id;

    deleteData(`http://localhost:3000/posts/${id}`)
      .then((data) => {
        loadData();
      })
      .catch((err) => console.log("Error while deleting", err));
  }
}

// Edit Post

// trying to add a key value to the object id with increment number
// getData().then((data) => {
//   const newList = [];
//   let inc = 2;
//   data.map((element) => {
//     let {
//       show_id,
//       type,
//       title,
//       director,
//       cast,
//       country,
//       date_added,
//       release_year,
//       rating,
//       duration,
//       listed_in,
//       description,
//     } = element;

//     let newElement = {
//       show_id,
//       type,
//       title,
//       director,
//       cast,
//       country,
//       date_added,
//       release_year,
//       rating,
//       duration,
//       listed_in,
//       description,
//       id: inc,
//     };
//     inc++;
//     postData(newElement).then((data) => {
//       console.log("success");
//     });
//     // newList.push(newElement);
//   });
// });
