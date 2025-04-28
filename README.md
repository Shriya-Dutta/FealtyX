# FealtyX Frontend Assignent - Task Tracker


## Steps to run project on Local:
<p>Step 1) Clone the repository from the "main" branch to your local.</p>
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
      
- Dashboard Page Features (Common to both Developer and Manager):
    - Nav bar showing the user's role and a Logout button
    - Grid view of all tasks
    - Filter tasks based on task status - open, closed, pending approval
    - Sort tasks based on task features - priority, start date, closed date
    - A trend line showing the number of tasks worked upon each day (total number of active tasks in a day)
    - Task card shows basic necessary details - title, priority, assigned to, assigned by, status (open - green, closed - grey, pending approval - yellow)
    - On clicking a task card - a detailed view of all the task details is shown - title, description, priority, assigned to, assigned by, comments, start date, closed date, approved date, status, total time spent

- Developer Dashboard Features
    - Add task button to create a new task with all the necessary details - title, description, priority, assigned to, assigned by, comments
    - Task card has two buttons - edit and delete
    - Developer can update any of the task details, log time or change status from open to close by clicking on the edit button
    - On updating status to close, the task status is changed to pending approval
    - If manager approves the task, the task status is changed to closed. If manager rejects the approval, the task status is changed to open

- Manager Dashboard Features:
    - A task marked as pending approval is shown to the manager with the Approve / Reject Button
    - On clicking on the Approve / Reject button on the task card, a detailed view of the task is shown where in the manager can review the task and mark it as approved or reopen the task.


## Future Scope:
- Use Database to store all the task details - currently Redux store and browser's local storage is used.
- Show notification in Manager Dashboard when a task is sent for approval.
- Notify the Developer when the Manager approves/reopens the task.
- Enable filtering of tasks based on assigned to and assigned by fields.
- More bug/task tracking features can be implemented to make a robust dashboard.

## Tech Stack Used:
- ReactJs - Frontend Framework
- CSS - Styling
- Redux - Store
- Netlify - Hosting
