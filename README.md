## Tour Scheduler API

### Get listing info
  * GET `/api/listings/:id`

**Path Parameters:**
  * `id` listing id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "Address": "String",
      "Price": "Number",
      "MainImg": "String",
      "Gallery": ["String"],
      "GalleryCount": "Number",
    }
```

### Add listing
  * POST `/api/listings`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "Address": "String",
      "Price": "Number",
      "MainImg": "String",
      "Gallery": ["String"],
      "GalleryCount": "Number",
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
      "Address": "String",
      "Price": "Number",
      "MainImg": "String",
      "Gallery": ["String"],
      "GalleryCount": "Number",
    }
```

### Delete listing
  * DELETE `/api/listing/:id`

**Path Parameters:**
  * `id` listing id

**Success Status Code:** `204`
