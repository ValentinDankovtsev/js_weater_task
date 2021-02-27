export function readList() {
  const list = JSON.parse(localStorage.getItem("items"));

  if (list === null) {
    return [];
  }
  return list;
}

export async function saveList(items) {
  localStorage.setItem("items", JSON.stringify(items));
}

export async function drawList(el, items) {
  el.innerHTML = `<ol>${items.map((el) => `<li>${el}</li>`).join("")}</ol>`;
}
