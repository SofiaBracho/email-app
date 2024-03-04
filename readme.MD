# Django Email Client

This is a simple email client built using Django. It allows users to send and receive emails, manage their inbox, archive and reply received emails.

## Getting Started

To get started, clone this repository. Then, install django by running:

```

pip install django

```

Next, create a new Django project and app by running:

```

django-admin startproject email_client

cd email_client

python manage.py startapp mail

```

Now, copy the contents of this repository into the mail app directory.

To run the server, use the following command:

```

python manage.py runserver

```

You can now access the email client at http://localhost:8000/.

## User Management

To register a new user, visit the /register page and fill out the registration form. Once registered, users can log in at the /login page.

## Email Management

To compose a new email, visit the /compose page and enter the recipient email addresses, subject, and body of the email. The email will be sent to the recipient and stored in the sender's sent folder.

To view the inbox, visit the / page. Here, users can see all emails that have been sent to them. To view a specific email, click on its subject, it will be marked as readed.

To archive an email, visit the email detail page and click the "Archive" button. The email will be moved to the archive folder. To view the archive folder, visit the /archive page.

## API Endpoints

The following API endpoints are available:

- /compose (POST): composes a new email and sends it to the specified recipients

- /mailbox/<mail_box> (GET): returns a list of emails in the specified mailbox (inbox, sent, or archive)

- /email/<email_id> (GET, PUT): returns the details of a specific email and allows updating its read and archived status

## Authentication

This project uses Django's built-in authentication system to manage user accounts. The @login_required decorator is used to restrict access to certain pages to logged-in users only.

## Models

The following models are used in this project:

- User: represents a user account

- Email: represents an email message, with fields for the sender, recipients, subject, body, and timestamp.
