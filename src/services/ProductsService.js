export function* fetchProduct(id) {
  console.log("Fetching latest products.");
  const response = yield fetch(`http://localhost:3004/products/${id}`);
  const responseJson = yield response.json();
  return responseJson;
}

export function* fetchLatestProducts() {
  console.log("Fetching latest products.");
  const response = yield fetch(`http://localhost:3004/products?_limit=20`);
  const responseJson = yield response.json();
  return responseJson;
}
