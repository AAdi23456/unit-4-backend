# ecommersapi


This project provides APIs for user authentication, authorization, managing products, and cart functionality.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/project-name.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database connection and environment variables.

## Routes
## deployedlink-https://colorful-helmet-slug.cyclic.app/
### Authorization Routes

#### POST /auth/signup

Creates a new user account.

- Request body:

  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password"
  }
  ```

- Response:

  - 200 OK:

    ```json
    {
      "msg": "Registration success"
    }
    ```

  - 400 Bad Request:

    ```json
    {
      "msg": "User already exists"
    }
    ```

#### POST /auth/login

Authenticates the user and generates a JWT token.

- Request body:

  ```json
  {
    "email": "johndoe@example.com",
    "password": "password"
  }
  ```

- Response:

  - 200 OK:

    ```json
    {
      "msg": "Login successful!",
      "token": "your-jwt-token",
      "name": "John Doe"
    }
    ```

  - 400 Bad Request:

    ```json
    {
      "msg": "Wrong credentials"
    }
    ```

### Product Routes

#### POST /kid/add

Adds a new kids' product.

- Request body:

  ```json
  {
    "title": "Kids Product",
    "brand": "Brand Name",
    "color": "Red",
    "price": 19.99
  }
  ```

- Response:

  - 200 OK:

    ```json
    {
      "msg": "Data added"
    }
    ```

#### POST /womens/add

Adds a new women's product.

- Request body:

  ```json
  {
    "title": "Women's Product",
    "brand": "Brand Name",
    "color": "Blue",
    "price": 29.99
  }
  ```

- Response:

  - 200 OK:

    ```json
    {
      "msg": "Data added"
    }
    ```

#### POST /men/add

Adds a new men's product.

- Request body:

  ```json
  {
    "title": "Men's Product",
    "brand": "Brand Name",
    "color": "Black",
    "price": 39.99
  }
  ```

- Response:

  - 200 OK:

    ```json
    {
      "msg": "Data added"
    }
    ```

#### GET /kid/show

Retrieves a list of kids' products.

- Query parameters:

  - `title`: Filters products by title (case-insensitive).
  - `Brand`: Filters products by brand (case-insensitive).
  - `color`: Filters products by color (case-insensitive).
  - `sbp`: Sorts products by price in ascending or descending order (possible values: "asc" or "desc").
  - `page`: Specifies the page number for pagination.

- Response:

  - 200 OK:

    ```json
    [
      {
        "title": "Kids Product 1",
        "brand": "Brand 1",
        "color": "Red",
        "price": 19.99
      },
      {
        "title": "Kids Product 2",
        "brand": "Brand 2",
        "color": "Blue",
        "price": 24.99
      }
    ]
    ```

#### GET /womens/show

Retrieves a list of women's products.

- Query parameters:

  - `title`: Filters products by title (case-insensitive).
  - `Brand`: Filters products by brand (case-insensitive).
  - `color`: Filters products by color (case-insensitive).
  - `sbp`: Sorts products by price in ascending or descending order (possible values: "asc" or "desc").
  - `page`: Specifies the page number for pagination.

- Response:

  - 200 OK:

    ```json
    [
      {
        "title": "Women's Product 1",
        "brand": "Brand 1",
        "color": "Red",
        "price": 29.99
      },
      {
        "title": "Women's Product 2",
        "brand": "Brand 2",
        "color": "Blue",
        "price": 34.99
      }
    ]
    ```

#### GET /men/show

Retrieves a list of men's products.

- Query parameters:

  - `title`: Filters products by title (case-insensitive).
  - `Brand`: Filters products by brand (case-insensitive).
  - `color`: Filters products by color (case-insensitive).
  - `sbp`: Sorts products by price in ascending or descending order (possible values: "asc" or "desc").
  - `page`: Specifies the page number for pagination.

- Response:

  - 200 OK:

    ```json
    [
      {
        "title": "Men's Product 1",
        "brand": "Brand 1",
        "color": "Red",
        "price": 39.99
      },
      {
        "title": "Men's Product 2",
        "brand": "Brand 2",
        "color": "Blue",
        "price": 44.99
      }
    ]
    ```

#### GET /kid/one/:id

Retrieves a specific kids' product by its ID.

- Path parameter:

  - `id`: The ID of the product.

- Response:

  - 200 OK:

    ```json
    {
      "title": "Kids Product 1",
      "brand": "Brand 1",
      "color": "Red",
      "price": 19.99
    }
    ```



  
### Cart Routes

#### POST /cart/add

Adds an item to the user's cart.

- Request body:

  ```json
  {
    "img": "product-image-url",
    "title": "Product Title",
    "price": 19.99,
    "brand": "Brand Name",
    "token": "token"
  }
  ```

- Response:

  - 200 OK:

    ```json
    {
      "msg": "Item added to the cart"
    }
    ```

  - 405 Method Not Allowed:

    ```json
    {
      "msg": "Please select the item first"
    }
    ```

  - 200 OK:

    ```json
    {
      "msg": "Item is already present in the cart"
    }
    ```

#### POST /cart/show

Retrieves the user's cart items.

- Request body:

  ```json
  {
    "email": "user@example.com"
  }
  ```

- Response:

  - 200 OK:

    ```json
    [
      {
        "img": "product-image-url",
        "title": "Product Title",
        "price": 19.99,
        "brand": "Brand Name",
        "email": "user@example.com"
      }
    ]
    ```

  - 200 OK:

    ```json
    {
      "msg": "Your cart is empty"
    }
    ```

#### DELETE /cart/Remove/:id

Removes an item from the user's cart.

- Path parameter:

  - `id`: The ID of the cart item.

- Request body:

  ```json
  {
    "email": "user@example.com"
  }
  ```

- Response:

  - 200 OK:

    ```json
    {
      "msg": "Item removed from cart"
    }
    ```

  - 200 OK:

    ```json
    {
      "msg": "Item is not present in your cart"
    }
    ```

#### PATCH /cart/quantity/:id

Changes the quantity of an item in the user's cart.

- Path parameter:

  - `id`: The ID of the cart item.

- Request body:

  ```json
  {
    "email": "user@example.com",
    "q": 5
  }
  ```

- Response:

  - 200 OK:

    ```json
    {
      "msg": "Quantity changed in your cart"
    }
    ```

  - 200 OK:

    ```json
    {
      "msg": "Item is not present in your cart"
    }
    ```

