# FealtyX Frontend Assignent - Task Tracker


## Steps to run project on Local:
<p>Step 1) Clone the repository to your local.</p>
<p>Step 2) Go inside tasktracker folder.</p>
<p>Step 3) Run the command "npm install".</p>
<p>Step 4) Run the command "npm start".</p>
<p>Step 5) Open localhost:3000 in your browser to view the app.</p>

## Login Credentials:
- Developer Role: 
    - Email: developer@fealtyx.com
    - Password: dev@123

- Manager Role:
    - Email: manager@fealtyx.com
    - Password: manager@123

## Features:
- Login Page
    - Supports login of users with two roles - Developer and Manager.
    - On successful login, user is redirected to Developer Dashboard or Manager Dashboard, depending on the user's role.
- Dashboard Features (Common to both Developer and Manager):
    - Nav bar showing the user's role and a Logout button
    - Grid view of all tasks
    - Filter tasks based on task status - open, closed, pending approval
    - Sort tasks based on task features - priority, start date, closed date
    - Add task button to create a new task with all the necessary details - title, description, priority, assigned to, assigned by, comments.
    - A trend line showing the number of tasks worked upon each day (total number of active tasks in a day)
    - Task card shows basic necessary details - title, priority, assigned to, assigned by, status (open - green, closed - grey, pending approval - yellow)
    - On clicking a task card - a detailed view of all the task details is shown - title, description, priority, assigned to, assigned by, comments, start date, closed date, approved date, status, total time spent
    - Task card has two buttons - edit and delete
    - User can update any of the task details, log time, change status from open to close by clicking on the edit button
    - On updating status to close, the task status is changed to pending approval and the task is shown to the manager asking for approval
    - On successful manager approval, the task is shown as closed

Developer Dashboard Features
   
