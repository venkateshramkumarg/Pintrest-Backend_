# Pintrest API

Welcome to the Pintrest API. This application allows users to create, retrieve, and delete images through a RESTful API.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Create Image](#create-image)
  - [Get Images](#get-images)
  - [Delete Image](#delete-image)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd todo
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the application:
    ```sh
    npm start
    ```

## Usage

The application runs on `http://localhost:3000/api`. You can use tools like Postman or curl to interact with the API.

## API Endpoints

### Create Image

- **Create Image**
    ```http
    POST /api/createImage
    ```
    **Request Body:**
    ```json
    {
      "title": "image_title",
      "imageUrl": "image_url"
    }
    ```

### Get Images

- **Get Images**
    ```http
    GET /api/getImages
    ```

- **Search Image**
    ```http
    POST /api/getImages/search/image
    ```
    **Request Body:**
    ```json
    {
      "searchTitle": "search_title"
    }
    ```

### Delete Image

- **Delete Image**
    ```http
    DELETE /api/deleteImage/:id
    ```

## Environment Variables

Create a [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FVS%20CODE%2FNodeJS%2Ftodo%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\VS CODE\NodeJS\todo\.env") file in the root directory and add the following environment variables:
```env
PORT=3000
URI=your_mongodb_uri
```

## Licence
This project is licensed under the MIT License.

