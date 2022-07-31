const api_url = "http://localhost:3000/posts";

export async function getData() {
  const response = await fetch(api_url);
  const data = await response.json();
  return data;
}

export const postData = async (data) => {
  const response = await fetch(api_url, {
    method: "POST",
    headers: {
      //instead of headers I wrote headars :')
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  return resData;
};

export async function deleteData(url) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
}

// Update
export async function updateData(url, data) {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      //instead of headers I wrote headars :')
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  return resData;
}
