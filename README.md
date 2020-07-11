## Photos API

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
      "gallery": ["StringUrl",...]
    }
```

### Add listing
  * POST `/api/listings/:id/photos`

  **Path Parameters**
    * `:id` listing id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "photo_url": "String"
    }
```


### Update listing info
  * PUT `/api/listings/:id`

**Path Parameters:**
  * `id` listing id

**Success Status Code:** `204`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "id": "Number",
      "address": "String",
      "city": "String",
      "state": "String",
      "zip_code": "Number"
    }
```

### Delete listing
  * DELETE `/api/listing/:id/photos/:photoId`

**Path Parameters:**
  * `id` listing id
  * `photoId` photo id

**Success Status Code:** `204`
