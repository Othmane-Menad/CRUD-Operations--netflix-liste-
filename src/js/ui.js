let id = document.querySelector(".id");
let type = document.querySelector(".type");
let title = document.querySelector(".title");
let director = document.querySelector(".director");
let release_year = document.querySelector(".release_date");
const btn = document.querySelector("#btn");
let forState = "add";

export function populateTable(data) {
  const body = document.querySelector("#tbody");
  let query = "";
  data.map((element) => {
    let { id, type, title, director, release_year } = element;
    query += `
    <tr>
    <td>${id}</td>
    <td>${type}</td>
    <td>${title}</td>
    <td>${director}</td>
    <td>${release_year}</td>
    <td><a href="#" class="delete" data-id="${id}"
    >X</a></td>
    <td><a href="#" class="edit" data-id="${id}">
    E
  </a></td>

    </tr>
    `;
  });
  body.innerHTML = query;
}

//show the title,body and id in the input to edit them
export const fillInputs = (data) => {
  id.value = data.id;
  type.value = data.type;
  title.value = data.title;
  director.value = data.director;
  release_year.value = data.release_year;

  changeFormState("edit");
};

export const changeFormState = (type) => {
  if (type === "edit") {
    btn.textContent = "Update Post";

    // Condition if the cancel button existe do not create it again
    if (!document.querySelector(".post-cancel")) {
      // Create cancel button
      const button = document.createElement("button");
      button.className = "post-cancel";
      button.appendChild(document.createTextNode("Cancel Edit"));

      // Get Parent
      const cardForm = document.querySelector(".container");

      // Get element to insert before
      const formEnd = document.querySelector("form-end");
      // Insert the cancel button
      cardForm.insertBefore(button, formEnd);
    }
  } else {
    btn.textContent = "Submit Post";

    // Remove cancel button if there
    if (document.querySelector(".post-cancel")) {
      document.querySelector(".post-cancel").remove();

      // Clear
      // clearIdInput;

      // Clear title and body inputs
      // clearfields();
    }
  }
};
