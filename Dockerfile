# Stage 1: Build frontend
FROM node:18 as build-stage

# Set working directory for frontend
WORKDIR /code

# Copy frontend package files
COPY ./Frontend/ecommerce_inventory/package.json ./Frontend/ecommerce_inventory/package-lock.json /code/

# List contents (optional, for verification)
RUN ls -l /code

# Install frontend dependencies
RUN npm install

# Copy frontend source code
COPY ./Frontend/ecommerce_inventory /code/
COPY ./Frontend/ /code/Frontend/

# List contents (optional, for verification)
RUN ls -l /code

# Build frontend (adjust this based on your React build process)
RUN npm run build

# Stage 2: Build Django backend
FROM python:3.11.0

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set working directory for backend
WORKDIR /code

# Copy backend requirements file
COPY ./Backend/EcommerceInventory/requirements.txt /code/

# List contents (optional, for verification)
RUN ls -l /code

# Install backend dependencies
RUN pip install -r requirements.txt

# Copy built frontend to Django static files directory
COPY --from=build-stage /code/build /code/static/

# List contents (optional, for verification)
RUN ls -l /code/static

# Copy Django project files
COPY ./Backend/EcommerceInventory /code/
COPY ./Frontend/ /code/Frontend/

# List contents (optional, for verification)
RUN ls -l /code

# Collect static files
RUN python manage.py collectstatic --no-input

# Expose port 80 (adjust as necessary)
EXPOSE 80

# Command to run Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:80"]
