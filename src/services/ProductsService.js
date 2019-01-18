const url = "http://localhost:3004/products";

export function* fetchProduct(id) {
  console.log("Fetching latest products.");
  const response = yield fetch(`${url}/${id}`);
  const responseJson = yield response.json();
  return responseJson;
}

export function* fetchLatestProducts(payload) {
  console.log("Fetching latest products. " + JSON.stringify(payload));
  let query = "";

  if (payload && payload.category !== null) {
    console.debug("FILTER IN SERVICE:" + payload.category);
    query = query.concat(`category=${payload.category}`);
  }

  if (query.length > 0) {
    query = query.concat("&&");
  }

  if (payload && payload.limit) {
    console.debug("FILTER IN SERVICE:" + payload.limit);
    query = query.concat(`_limit=${payload.limit}`);
  }

  const response = yield fetch(`${url}?${query}`);
  const responseJson = yield response.json();
  return responseJson;
}

export function* searchProducts(payload) {
  console.debug("Searching all products");

  const response = yield fetch(`${url}?q=${payload.query}`);
  const responseJson = yield response.json();
  return responseJson;
}
