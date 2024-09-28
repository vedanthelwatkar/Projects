# Inventory Management System API

This project is a backend API for a simple Inventory Management System using Django Rest Framework.

## Setup Instructions

1. Clone the repository:

   ```
   git clone <repository-url>
   cd <repo>
   ```

2. Create a virtual environment and activate it:

   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required packages:

   ```
   pip install -r requirements.txt
   ```

4. Set up the PostgreSQL database:

   - Create a new database named `inventory_db`
   - Update the database settings in `inventory_project/settings.py` with your database credentials

5. Run migrations:

   ```
   python manage.py migrate
   ```

6. Create a superuser:

   ```
   python manage.py createsuperuser
   ```

7. Run the development server:
   ```
   python manage.py runserver
   ```

## API Endpoints

- User Registration: POST `/api/register/`
- Login (Get JWT Token): POST `/api/token/`
- Refresh Token: POST `/api/token/refresh/`
- Create Item: POST `/api/items/`
- Read Item: GET `/api/items/{item_id}/`
- Update Item: PUT `/api/items/{item_id}/`
- Delete Item: DELETE `/api/items/{item_id}/`

## Running Tests

To run the unit tests:

```
python manage.py test
```

## Logging

Logs are stored in the `debug.log` file in the project root directory.
