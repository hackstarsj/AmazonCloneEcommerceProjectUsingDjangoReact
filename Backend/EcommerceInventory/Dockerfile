FROM node:14 as build-stage

# Set working directory
WORKDIR /app

# Copy frontend files
COPY ../Frontend/ecommerce_inventory/package.json ../Frontend/ecommerce_inventory/package-lock.json /app/

# Install dependencies
RUN npm install

# Copy frontend source code
COPY ../Frontend/ecommerce_inventory /app/

# Build frontend (adjust this based on your React build process)
RUN npm run build

# Production stage
FROM python:3.9

# Copy built frontend to Django static files directory
COPY --from=build-stage /app/build /path/to/django/static/directory

# Continue with your Django setup...
