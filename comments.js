// Create web server
// 1. Create a web server
// 2. Load the comments from the file
// 3. Add the comments to the page
// 4. Add a form to the page
// 5. Handle form submission
// 6. Append the comment to the page
// 7. Save the comments to the file
// 8. Redirect to the home page

// Load the file system module
const fs = require('fs');

// Load the express module
const express = require('express');

// Load the body-parser module
const bodyParser = require('body-parser');

// Create the web server
const app = express();

// Configure the web server
// Serve files from the public directory
app.use(express.static('public'));

// Parse the body of the request
app.use(bodyParser.urlencoded({ extended: false }));

// Load the comments from the file
function loadComments() {
  const comments = fs.readFileSync('comments.json');
  return JSON.parse(comments);
}

// Save the comments to the file
function saveComments(comments) {
  fs.writeFileSync('comments.json', JSON.stringify(comments));
}

// Add a comment
function addComment(comment) {
  // Load the comments
  const comments = loadComments();

  // Add the comment
  comments.push(comment);

  // Save the comments
  saveComments(comments);
}

// Add a route for the home page
app.get('/', (request, response) => {
  // Load the comments
  const comments = loadComments();

  // Create the HTML
  let html = '<h1>Comments</h1>';

  // Create the form
  html += '<form method="POST" action="/add-comment">';
  html += '<input name="name" placeholder="Name">';
  html += '<textarea name="comment" placeholder="Comment"></textarea>';
  html += '<button>Submit</button>';
  html += '</form>';

  // Add the comments to the page
  html += '<ul>';
  for (let comment of comments) {
    html += `<li>${comment.name} - ${comment.comment}</li>`;
  }
  html += '</ul>';

  // Send the HTML
  response.send(html);
});

// Add a route for the add-comment page
app.post('/add-comment', (request, response) => {
  // Get the comment from the form submission
  const comment = request.body;

});