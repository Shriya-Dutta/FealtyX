import { useSelector } from "react-redux";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const TaskTrend = () => {

    const { tasks } = useSelector((state) => state.tasks);

    const allStartDates = tasks.map(task => new Date(task.startDate));
    const earliestDate = new Date(Math.min(...allStartDates));
    const today = new Date();

    earliestDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const trendData = [];
    for (let d = new Date(earliestDate); d <= today; d.setDate(d.getDate() + 1)) {

        const currentDate = new Date(d);
        currentDate.setHours(0, 0, 0, 0);

        const activeTasks = tasks.filter(task => {
            const taskStart = new Date(task.startDate);
            const taskClose = task.closedDate ? new Date(task.closedDate) : null;

            taskStart.setHours(0, 0, 0, 0);
            if (taskClose) taskClose.setHours(0, 0, 0, 0);

            return taskStart <= currentDate && (!taskClose || taskClose >= currentDate);
        });

        trendData.push({
            date: currentDate.toLocaleDateString('en-GB'),
            activeTasks: activeTasks.length,
        });
    }

    return (
        <div style={{ width: '100%', height: 400 }}>
            <h3 style={{ textAlign: 'center' }}>Number of Tasks Worked On Each Day</h3>

            <ResponsiveContainer width="100%" height="90%">
                {trendData.length === 0 ? (
                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3rem' }}>
                        <p>No tasks available</p>
                    </div>
                ) : (

                    <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 50 }}>

                        <Line
                            type="monotone"
                            dataKey="activeTasks"
                            stroke="#8884d8"
                        />
                        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            angle={-45}
                            textAnchor="end"
                            height={70}
                        />
                        <YAxis allowDecimals={false} />
                        <Tooltip />

                    </LineChart>
                )}
            </ResponsiveContainer>
        </div>
    );
};

export default TaskTrend;