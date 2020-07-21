## Home Listing Images API

### Get listing info
  * GET `/api/listings/:id/`

**Path Parameters:**
  * `id` listing id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "id": "Number",
      "address": "String",
      "city": "String",
      "state": "String",
      "zip_code": "Number",
      "gallery": ["StringUrl",...],
      "realtor_firstName": "String",
      "realtor_lastName": "String",
    }
```

### Add listing
  * POST `/api/listings/:id/images`

  **Path Parameters**
    * `:id` listing id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "image_url": "String"
    }
```

### Update listing info
  * PATCH `/api/listings/:id`

**Path Parameters:**
  * `id` listing id

**Success Status Code:** `204`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "id": "Number",
      "image_url": "String",
    }
```

### Delete listing
  * DELETE `/api/listing/:id/images/:image_id`

**Path Parameters:**
  * `id` listing id
  * `image_id` image id

**Success Status Code:** `204`
