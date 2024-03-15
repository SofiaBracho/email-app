<div align="center">
  <h1 align="center">Django Email Client</h1>
</div>
<br/>



<div align="center">

[![made-with-python](https://img.shields.io/badge/Made%20with-Python-1f425f.svg)](https://www.python.org/)
[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com)
<br/>
<br/>
<a href="https://www.linkedin.com/in/sofiabrach0/">
![LinkedIn Badge](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=fff&style=for-the-badge)
</a>
<a href="https://github.com/SofiaBracho">
![GitHub Badge](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=fff&style=for-the-badge)
</a>
</div>


This is a simple email client simulation built using Django. It allows registered users to send and receive emails, manage their inbox, archive and reply received emails. Everything in a single page, managing views and request using asyncronous JavaScript. In the back-end it works with Django.


## ⚙️ Key Features
- **Email dashboard**: To view the inbox, visit the `/` page. Here, users can see all emails that have been sent to them. To view a specific email, click on its subject, it will be marked as readed.

- **Sent dashboard**: Click the `sent` button to see all the emails sent by you.

- **Compose email**: To compose a new email, visit the `/compose` page and enter the recipient email addresses, subject, and body of the email. The email will be sent to the recipient and stored in the sender's sent folder.

- **Archive email**: To archive an email, visit the email detail page and click the "Archive" button. The email will be moved to the archive folder. To view the archive folder, visit the `/archive` page.
  
- **User Authentication**: Users can register, log in, and log out of the application.


## 🖥️ Demo

![email-app Demo GIF](https://github.com/SofiaBracho/email-app/blob/main/mail/static/demo.gif)


## 🛠️ Getting Started

### Prerequisites

Here's what you need to be able to run this App:

- Node.js
- Python

### 1. Clone the repository

```shell
git clone https://github.com/SofiaBracho/email-app
cd email-app
```

### 2. Migrate database models

```shell
python manage.py makemigrations
python manage.py migrate
```

### 3. Run the dev server

```shell
python manage.py runserver
```

### 4. Open the App in your local host

```shell
http://localhost:8000
```

### 5. Register and login

Create your user account in the `/register` route, then login into the form in the `/login` route.


## 🖇️ Views
The `views.py` file contains all the views functions which handle incoming requests.

- **Register**: Allows users to register with an email address and an password. If the registration is successful it redirects to the home.

![Register view](https://github.com/SofiaBracho/email-app/blob/main/mail/static/img/register.PNG)

- **Login**: In this view, registered users can log in into their accounts. 

![Login view](https://github.com/SofiaBracho/email-app/blob/main/mail/static/img/login.PNG)

- **Inbox**: Displays all received emails in reverse cronological order. Email subjects with a white background are not viewed yet, if the background is gray the have been viewed.

![Inbox view](https://github.com/SofiaBracho/email-app/blob/main/mail/static/img/inbox.PNG)

- **Compose**: Shows a form to create new emails. The user must be logged  in to access this view. These are the compose form fields:
  - From
  - To
  - Subject
  - Body

![Compose view](https://github.com/SofiaBracho/email-app/blob/main/mail/static/img/compose.PNG)

- **Sent**: Shows all emails sent by the logged user.

![Sent view](https://github.com/SofiaBracho/email-app/blob/main/mail/static/img/sent.PNG)

- **Archived**: Shows all emails received and marked as "archived" by the logged user.

![Archived view](https://github.com/SofiaBracho/email-app/blob/main/mail/static/img/archive.PNG)


## 🗄️ Models

The `models.py` file defines the database models for the application: 
- **User**: represents a user account with attributes such as: 
  - Username
  - Email
  - Password
- **Email**: represents an email message, with fields such as: 
  - Sender
  - Recipients
  - Subject
  - Body
  - Timestamp



## 🌐 API Endpoints

The following API endpoints are available:

- `/compose` (POST): composes a new email and sends it to the specified recipients

- `/mailbox/<mail_box>` (GET): returns a list of emails in the specified mailbox (inbox, sent, or archive)

- `/email/<email_id>` (GET, PUT): returns the details of a specific email and allows updating its read and archived status


## 🔀 Contributing

This app is an open-source project and anyone from the community can contribute to it.

If you'd like to contribute, fork the repository and make changes as you'd like. Pull requests are welcome.

### 👥 Author

<a href="https://github.com/SofiaBracho">
  <img src="https://github.com/SofiaBracho/email-app/blob/main/mail/static/img/author.png" width="50px" alt="Author"/>
</a>

**Sofia Bracho**
<br>
Web developer