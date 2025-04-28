import React, { useState, useEffect } from 'react';
import TaskCard from '../../components/TaskCard/TaskCard';
import './DashboardStyles.css';
import NavBar from '../../components/NavBar/NavBar';
import Button from '../../components/Button/Button';
import CreateEditModal from '../../components/Modal/TaskModal/TaskModal';
import { useSelector } from 'react-redux';
import TaskTrend from '../../components/TaskTrend/TaskTrend';
import { FaPlus } from 'react-icons/fa';

const Dashboard = () => {

  const { tasks } = useSelector((state) => state.tasks);
  const role = useSelector((state) => state.auth.user?.role);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('None');
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [selectedStatus, setSelectedStatus] = useState('All');

  const statuses = ['All', 'Open', 'Closed', 'Pending Approval'];

  // console.log("Tasks: ", tasks);

  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    let tempTasks = [...tasks];

    if (filterStatus !== 'All') {
      tempTasks = tempTasks.filter(task => task.status === filterStatus);
    }

    if (sortBy === 'Priority') {
      const priorityOrder = { High: 1, Moderate: 2, Low: 3 };
      tempTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortBy === 'StartDate') {
      tempTasks.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }
    else if (sortBy === 'ClosedDate') {
      tempTasks.sort((a, b) => new Date(b.closedDate) - new Date(a.closedDate));
    }

    setFilteredTasks(tempTasks);

  }, [filterStatus, sortBy, tasks]);

  const handleFilterClick = (status) => {
    setFilterStatus(status);
  };

  const handleSortTask = (sortOption) => {
    setSortBy(sortOption);
  };


  return (
    <>
      <div id='developer-dashboard' className='developerDashboard'>
        <NavBar value={role === 'Developer' ? 'Developer Dashboard' : 'Manager Dashboard'} />

        <div id="task-container" className='taskContainer'>

          <div id="all-task-header" className='allTaskHeader'>
            {role === 'Developer' ? (
              <>
                <h3>My Tasks</h3>
                <Button
                  id="add-task"
                  className='addTask'
                  value="Add Task"
                  icon={<FaPlus />}
                  iconStyle={{ color: "#1fb142", width: "16px", height: "16px", marginRight: "8px" }}
                  onClick={handleAddTask}
                />
              </>)
              : <h3>All Tasks</h3>
            }
          </div>

          <div id='task-wrapper' className='taskWrapper'>

            <div id='view-tasks' className='viewTasks'>

              <div id='filter-tasks' className='filterTasks'>

                <label id='filter-label' className="sortLabel">Filter By:</label>

                <div id='filterBtn-container' className="filterBtnContainer">
                  {statuses.map((status) => (
                    <Button
                      key={status}
                      id={`${status.toLowerCase().replace(/\s/g, '-')}-tasks`}
                      className={`taskViewBtn ${selectedStatus === status ? 'selected' : ''}`}
                      value={status}
                      onClick={() => {
                        setSelectedStatus(status);
                        handleFilterClick(status);
                      }}
                    />
                  ))}
                </div>

              </div>

              <div id='sort-tasks' className='sortTasks'>
                <label id='sort-label' className="sortLabel">Sort By:</label>
                <select
                  id="sortTask-dropdown"
                  className="sortTaskDropdown"
                  onChange={(e) => handleSortTask(e.target.value)}
                >
                  <option value="None">None</option>
                  <option value="Priority">Priority</option>
                  <option value="StartDate">Start Date</option>
                  <option value="ClosedDate">Closed Date</option>
                </select>
              </div>

            </div>

            <div id='all-tasks' className='allTasks'>
              {filteredTasks.length > 0 ?
                filteredTasks.map((eachTask) => (
                  <TaskCard key={eachTask.id} task={eachTask} />
                )) :
                <p>No tasks available</p>
              }
            </div>
          </div>

          <div id='trend-chart' className='trendChart'>
            <TaskTrend />
          </div>

        </div>
      </div>

      {isModalOpen && <CreateEditModal onClose={handleCloseModal} text="Create Task" />}
    </>
  );
};

export default Dashboard;