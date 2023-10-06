document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', () => {compose_email()});
  document.querySelector('#compose-form').addEventListener('submit', submit_email);

  // Listen to click events on emails
  document.addEventListener('click', e => {
    if(e.target.dataset.id){
      email_details(e.target.dataset.id)
    } else if (e.target.parentElement.dataset.id) {
      email_details(e.target.parentElement.dataset.id)
    }
    else if (e.target.parentElement.parentElement.dataset.id) {
      email_details(e.target.parentElement.parentElement.dataset.id)
    }
  })

  // By default, load the inbox
  load_mailbox('inbox');
});

function email_details(id) {
  // Load email details
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#details-view').style.display = 'block';

  fetch(`emails/${parseInt(id)}`, {method: 'GET'})
    .then(response => {
      
      if (response.status != 404) {
        return response.json()
      } else {
        return response.json().then(error => {
          throw new Error(error.error);
        });
      }
    })
    .then(result => {
      
      // Render all email details
      document.querySelector('#from').innerHTML = `${result.sender}`
      document.querySelector('#to').innerHTML = `${result.recipients}`
      document.querySelector('#subject').innerHTML = `${result.subject}`
      document.querySelector('#timestamp').innerHTML = `${result.timestamp}`
      document.querySelector('#body').innerHTML = `${result.body}`

      user = document.querySelector('#user-email').textContent
      archiveBtn = document.querySelector('#archive')
      unarchiveBtn = document.querySelector('#unarchive')
      replyBtn = document.querySelector('#reply')

      if (user == result.sender) {

        //If the sender is the logged-in user dont show archive/unarchive buttons
        archiveBtn.style.display = 'none'
        unarchiveBtn.style.display = 'none'
        replyBtn.style.display = 'none'
      } else {    
        // Show reply btn
        replyBtn.style.display = 'block'
        
        // If the email is not archived show archive button, else, show unarchive
        if (result.archived == false) {
          archiveBtn.style.display = 'block'
          unarchiveBtn.style.display = 'none'
        } 
        else {
          archiveBtn.style.display = 'none'
          unarchiveBtn.style.display = 'block'
        }
      }

      // Remove old event listeners cloning the nodes
      const archiveClone = archiveBtn.cloneNode(true);
      archiveBtn.replaceWith(archiveClone);

      const unarchiveClone = unarchiveBtn.cloneNode(true);
      unarchiveBtn.replaceWith(unarchiveClone);

      // Event listeners to archive / unarchive emails 
      archiveClone.addEventListener('click', (e) => {
        e.preventDefault()
        archive_unarchive(result.id, result.archived)
      })
      unarchiveClone.addEventListener('click', (e) => {
        e.preventDefault()
        archive_unarchive(result.id, result.archived)
      })

      // Reply email
      replyBtn.addEventListener('click', () => {

        responseData = {
          recipient: result.sender,
          subject: `${ (result.subject.slice(0,4) == "Re: ") ? result.subject : "Re: " + result.subject }`,
          body: `On ${result.timestamp}, ${result.sender} wrote: ${result.body}\n`
        }

        compose_email(responseData)
      })

      // Mark as read if not already
      if (result.read == false) {
        mark_read(id)
      }
      
    })
    .catch(error => {
      // Show error message
      console.log(error)
    })
}

function archive_unarchive(id, archived){
  options = {
    method: 'PUT',
    body: JSON.stringify({
      archived: !archived
    })
  }

  fetch(`emails/${parseInt(id)}`, options)
    .then(response => {
      
      if (response.status == 204) {
        return response
      } else {
        return response.json().then(error => {
          throw new Error(error.error);
        });
      }
    })
    .then(result => {
      console.log(`Email ${ archived ? 'unarchived' : 'archived' } successfully!`)
      load_mailbox('inbox')
    })
    .catch(error => {
      // Show error message
      console.log(error)
    })
}

function mark_read(id) {

  options = {
    method: 'PUT',
    body: JSON.stringify({
      read: 'True'
    })
  }

  fetch(`emails/${parseInt(id)}`, options)
    .then(response => {
      
      if (response.status == 204) {
        return response
      } else {
        return response.json().then(error => {
          throw new Error(error.error);
        });
      }
    })
    .then(result => {
      console.log('Email marked as readed successfully!')
      
    })
    .catch(error => {
      // Show error message
      console.log(error)
    })
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#details-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Fetch all mails in the mailbox category
  fetch(`emails/${mailbox}`, {method: 'GET'})
    .then(response => response.json())
    .then(data => {

      data.forEach(mail => {
        // Create email element
        mailContainer = document.createElement('div')
        mailContainer.classList.add('mail-container', mail.read ? 'read' : 'unread')
        mailContainer.setAttribute('data-id', mail.id);
        mailDetails = document.createElement('div')
        mailDetails.innerHTML = `<b>${mail.sender}</b> ${mail.subject}`
        mailDateTime = document.createElement('div')
        mailDateTime.innerHTML = `${mail.timestamp}`
        mailDateTime.className = 'mail-timestamp'

        mailContainer.append(mailDetails)
        mailContainer.append(mailDateTime)
        document.querySelector('#emails-view').append(mailContainer);
      });

    })
    .catch(error => {
      console.log(error)
    })
}

function compose_email(responseData) {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#details-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = ((responseData != null) ? responseData.recipient : '');
  document.querySelector('#compose-subject').value = (responseData != null) ? responseData.subject : '';
  document.querySelector('#compose-body').value = (responseData != null) ? responseData.body : '';
}

function submit_email(e) { 
  e.preventDefault()
  
  recipients = document.querySelector('#compose-recipients').value;
  subject = document.querySelector('#compose-subject').value;
  body = document.querySelector('#compose-body').value;

  options = {
    method: 'POST',
    body: JSON.stringify({
      recipients: recipients,
      subject: subject,
      body: body
    })
  }

  // Send email via POST to API
  fetch('/emails', options)  
    .then(response => {
      
      if (response.status == 201) {
        return response.json()
      } else {
        return response.json().then(error => {
          throw new Error(error.error);
        });
      }
    })
    .then(result => {
      console.log(result)
      // Go to sent emails
      load_mailbox('sent')
    })
    .catch(error => {
      // Show error message in the view
      compose_email()
      document.querySelector('#compose-view').prepend(`${error}`)
      console.log(error)
    })
 
}
