# Amazon Clone Project Using Django and React

Welcome to the Amazon Clone Project! This project is based on a tutorial series by the SuperCoders YouTube channel. The series walks through creating a fully functional Amazon clone using Django and React, complete with an inventory management system.

## ER Diagram
<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/ER_Diagram.png" alt="Amazon Clone Project ER Diagram" style="width: 100%;"/>

## API Documentation 

- **API Documentaion for Post Man**: [API Documentaion](https://documenter.getpostman.com/view/5800143/2sA3QmEawp)

## CI CD Pipeline AWS Deployment Step using Docker and Github Action for [React+Django]

- **Complete Steps**: [Complete Steps](https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/CI_CD_Deployment_Step_Using_Docker_AWS.txt)


## YouTube Tutorial Series

This project follows the tutorial series available on the SuperCoders YouTube channel. You can watch the entire series using the following links:

- **SuperCoders Channel**: [SuperCoders YouTube Channel](https://www.youtube.com/@SuperCoders)
- **Project Playlist**: [Amazon Clone Project Playlist](https://www.youtube.com/watch?v=VOgfT0mSBvc&list=PLb-NlfexLTk-bLuLZNHmpfDdn7XlkWKlw&pp=iAQB)

## Project Overview

This project involves creating a clone of Amazon's web application. It includes features such as user authentication, product listings, a shopping cart, and an inventory management system. The project is built using the following technologies:

- **Backend**: Django (Python)
- **Frontend**: React (JavaScript)
- **Database**: MySQL

## Features

- User Authentication (Sign Up, Login, Logout)
- Product Listing and Search
- Product Detail View
- Shopping Cart Functionality
- Inventory Management System for Admin
- Order Management
- Purchase Order
- Sales order
- Supplier
- Warehouse Management
- User Management
- Multi Level Ecommerce Website
- Responsive Design

## Getting Started

### Prerequisites

Ensure you have the following installed on your local development machine:

- Python (>= 3.6)
- Node.js (>= 14.0)
- npm (>= 6.0)
- Django (>= 5.0)
- React (>= 17.0)
- MySQL Server

### Installation

1. **Clone the Repository**

### For Backend
```
-cd backend
python -m venv venv
source ../venv/bin/activate  # On Windows, use `venv\Scripts\activate`
pip install -r requirements.txt

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'your_database_name',
        'USER': 'your_database_user',
        'PASSWORD': 'your_database_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}


python manage.py migrate
python manage.py runserver

```

### For Frontend

```
cd ../frontend
npm install
npm start
```

### Usage

Once both the backend and frontend servers are running, you can access the application at `http://localhost:3000` for the frontend and `http://localhost:8000` for the backend.

## Contributing

We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) for more information on how to get started.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- Special thanks to the SuperCoders YouTube channel for providing the tutorial series that made this project possible.

---

Enjoy building your Amazon clone! If you have any questions or run into issues, feel free to open an issue on this repository or reach out through the comments on the YouTube tutorial videos.


## Screenshots

### Empty Dashboard 
<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/first.png" alt="Amazon Clone Project Empty Dashboard" style="width: 100%;"/>

### DIfferent Themes

## Light Theme
<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/16.png" alt="Amazon Clone Project Empty Dashboard" style="width: 100%;"/>

## Blue Light Theme
<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/17.png" alt="Amazon Clone Project Empty Dashboard" style="width: 100%;"/>

## Blue Dark Theme
<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/22.png" alt="Amazon Clone Project Empty Dashboard" style="width: 100%;"/>

## Green Light Theme
<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/18.png" alt="Amazon Clone Project Empty Dashboard" style="width: 100%;"/>

## Green Dark Theme
<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/19.png" alt="Amazon Clone Project Empty Dashboard" style="width: 100%;"/>

## Red Light Theme
<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/20.png" alt="Amazon Clone Project Empty Dashboard" style="width: 100%;"/>

## Red Dark Theme
<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/21.png" alt="Amazon Clone Project Empty Dashboard" style="width: 100%;"/>

## Orange Light Theme
<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/23.png" alt="Amazon Clone Project Empty Dashboard" style="width: 100%;"/>

## Orange Dark Theme
<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/24.png" alt="Amazon Clone Project Empty Dashboard" style="width: 100%;"/>


### Dynamic Form For Add Product ScreenShot with JSON Key Value Pair Input and Multi Step form

<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/2.png" alt="Amazon Clone Project Add Products" style="width: 100%;"/>

<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/3.png" alt="Amazon Clone Project Add Products" style="width: 100%;"/>

<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/4.png" alt="Amazon Clone Project Add Products" style="width: 100%;"/>

<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/5.png" alt="Amazon Clone Project Add Products" style="width: 100%;"/>

<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/6.png" alt="Amazon Clone Project Add Products" style="width: 100%;"/>


## Sidebar Active Indicator
<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/7.png" alt="Amazon Clone Project Sidebar Active" style="width: 100%;"/>

## Manage Category Page With Search,Sorting,Pagination,Item Per page,DataGrid,Expandable Child Item and API Integrated

<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/8.png" alt="Amazon Clone Project Manage Category" style="width: 100%;"/>


<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/9.png" alt="Amazon Clone Project Manage Category" style="width: 100%;"/>


<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/10.png" alt="Amazon Clone Project Manage Category" style="width: 100%;"/>

<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/11.png" alt="Amazon Clone Project Manage Category" style="width: 100%;"/>

<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/12.png" alt="Amazon Clone Project Manage Category" style="width: 100%;"/>

<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/13.png" alt="Amazon Clone Project Manage Category" style="width: 100%;"/>


<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/14.png" alt="Amazon Clone Project Manage Category" style="width: 100%;"/>

## Added Multi File Upload with Preview in Dynamic Form 

<img src="https://raw.githubusercontent.com/hackstarsj/AmazonCloneEcommerceProjectUsingDjangoReact/master/screenshots/15.png" alt="Amazon Clone Project Dynamic Form with Multi File Upload" style="width: 100%;"/>


## Commits
# Commit Tree
