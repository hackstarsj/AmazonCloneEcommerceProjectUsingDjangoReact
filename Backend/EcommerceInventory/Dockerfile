# Stage 1: Build frontend
FROM node:14 as build-stage

RUN ls -l /app

# Set working directory
WORKDIR /app
RUN ls -l /app

# Copy frontend package files
COPY ../../Frontend/ecommerce_inventory/package.json ../../Frontend/ecommerce_inventory/package-lock.json /app/
RUN ls -l /app

# Install frontend dependencies
RUN npm install
RUN ls -l /app

# Copy frontend source code
COPY ../../Frontend/ecommerce_inventory /app/
RUN ls -l /app

# Build frontend (adjust this based on your React build process)
RUN npm run build
RUN ls -l /app

# Stage 2: Build Django backend
FROM python:3.9

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set working directory
WORKDIR /code
RUN ls -l /app

# Install dependencies
COPY ./Backend/EcommerceInventory/requirements.txt /code/
RUN pip install -r requirements.txt
RUN ls -l /app

# Copy built frontend to Django static files directory
COPY --from=build-stage /app/build /code/static/
RUN ls -l /app

# Copy Django project files
COPY ./EcommerceInventory /code/
RUN ls -l /app

# Collect static files
RUN python manage.py collectstatic --no-input

# Expose port 80 (adjust as necessary)
EXPOSE 80
RUN ls -l /app

# Command to run Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:80"]
