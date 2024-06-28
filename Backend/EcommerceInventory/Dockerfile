# Stage 1: Build React app
FROM node:14 as build

WORKDIR /app
COPY ./Frontend/ecommerce_inventory/package.json ./Frontend/ecommerce_inventory/package-lock.json /app/
RUN npm install
COPY ./Frontend/ecommerce_inventory /app
RUN npm run build

# Stage 2: Set up Django
FROM python:3.9

ENV PYTHONUNBUFFERED 1
WORKDIR /app

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the React build files to Django static directory
COPY --from=build /app/build /app/static/
COPY . /app/

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "EcommerceInventory.wsgi:application"]
