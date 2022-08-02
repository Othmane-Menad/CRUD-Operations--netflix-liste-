import "../style/style.scss";
import { getData, postData, deleteData, updateData } from "./http.js";
import { populateTable, fillInputs, changeFormState } from "./ui.js";

// Listener for when page load
document.addEventListener("DOMContentLoaded", loadData);

// Listener for the add button
document.querySelector("#btn").addEventListener("click", addData);

// Listen for edit state
document.querySelector("#tbody").addEventListener("click", enableEdit);

// Listen for cancel btn
document.querySelector(".container").addEventListener("click", cancelEdit);

// Function to add event listener over a nodelist
function addEventListenerByClass(className, event, func) {
  let list = document.querySelectorAll(className); // A nodelist output not an Array

  // Convert the nodelist into an array so we can use map
  //[...list] will convert it into an array too
  let arrList = Array.from(list);

  // Removing the last columns of the array which are the delete and edit because we don't need them
  arrList.length = arrList.length - 2;

  arrList.map((element) => {
    element.addEventListener(event, func);
  });
}
addEventListenerByClass("th", "click", Sorting);

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
  const id = document.querySelector(".id").value;
  const type = document.querySelector(".type").value;
  const title = document.querySelector(".title").value;
  const director = document.querySelector(".director").value;
  const release_year = document.querySelector(".release_date").value;

  const data = {
    id: id,
    type: type,
    title: title,
    director: director,
    release_year: release_year,
  };

  // Check for ID
  if (id === "") {
    // Empty mean it's not in edit mode
    postData(data)
      .then((data) => {
        loadData();
      })
      .catch((err) => console.log("error while posting data: ", err));
  } else {
    // this mean the id has a number so we are in Edit mode
    updateData(`http://localhost:3000/posts/${id}`, data).then((data) => {
      changeFormState("add");
      loadData();
    });
  }

  e.preventDefault();
}

// Search
function searching(e) {
  let data = e.target.value;
  // const allData = [];

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
// Enable Edit state
function enableEdit(e) {
  if (e.target.classList.contains("edit")) {
    const id = parseInt(e.target.dataset.id);

    // Selecting the type starting from the element that contain the class "edit"
    const type =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .previousElementSibling.previousElementSibling.previousElementSibling
        .textContent;

    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .previousElementSibling.previousElementSibling.textContent;

    const director =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .previousElementSibling.textContent;

    const release_year = parseInt(
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent
    );

    const data = {
      id: id,
      type: type,
      title: title,
      director: director,
      release_year: release_year,
    };

    fillInputs(data);
  }
  e.preventDefault();
}

// // Cancel Edit state
function cancelEdit(e) {
  if (e.target.classList.contains("post-cancel")) {
    changeFormState("add");
  }
  e.preventDefault();
}

/* --------- Sorting --------- */
// Sorting by column
function Sorting(e) {
  // console.log(e.target.dataset.column);
  let column = e.target.dataset.column;
  let order = e.target.dataset.order;
  let arrows = document.querySelectorAll(".arrow");

  getData().then((element) => {
    let filteredData = [];

    if (order === "desc") {
      e.target.dataset.order = "asc";

      // This is a sorting Algorithm
      filteredData = element.sort((a, b) => (a[column] > b[column] ? 1 : -1));
      // Change arrow from up to donw
      Array.from(arrows).map((element) => {
        element.innerHTML = "&#9660";
      });
    } else {
      e.target.dataset.order = "desc";

      filteredData = element.sort((a, b) => (a[column] < b[column] ? 1 : -1));
      Array.from(arrows).map((element) => {
        element.innerHTML = "&#9650";
      });
    }

    populateTable(filteredData);
  });
  e.preventDefault();
}

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
