export function populateTable(data) {
  const body = document.querySelector("#tbody");
  let query = "";
  data.map((element) => {
    let { show_id, type, title, director, release_year } = element;
    query += `
    <tr>
    <td>${show_id}</td>
    <td>${type}</td>
    <td>${title}</td>
    <td>${director}</td>
    <td>${release_year}</td>
    </tr>
    `;
  });
  body.innerHTML = query;
}


