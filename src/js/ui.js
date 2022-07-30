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
    <td><a href="#" class=" edit deep-purple-text" data-id="${id}">
    E
  </a></td>

    </tr>
    `;
  });
  body.innerHTML = query;
}

/* <div class="card-action">
  <a href="#" class=" edit deep-purple-text" data-id="${show_id}">
    <i class="fa fa-pencil"></i>
  </a>
  <a href="#" class="delete" data-id="${id}">
    <i class="fa fa-remove"></i>
  </a>
</div>; */
