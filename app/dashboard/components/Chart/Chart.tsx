"use client"
// Import necessary modules and styles
import styles from './chart.module.css'; // Import CSS module for styling
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Import components from Recharts library

//? Define data for the line chart
const data = [
    {
        name: "Sun",
        visit: 4000,
        click: 2400,
    },
    {
        name: "Mon",
        visit: 3000,
        click: 1398,
    },
    {
        name: "Tue",
        visit: 2000,
        click: 3800,
    },
    {
        name: "Wed",
        visit: 2780,
        click: 3908,
    },
    {
        name: "Thu",
        visit: 1890,
        click: 4800,
    },
    {
        name: "Fri",
        visit: 2390,
        click: 3800,
    },
    {
        name: "Sat",
        visit: 3490,
        click: 4300,
    },
];

//* Define the Chart functional component
const Chart = () => {
    return (
        <div className={styles.container}>
            {/*//* Title */}

            <h2 className={styles.title}>Weekly Recap</h2>

            {/*//* Responsive container for the line chart */}
            <ResponsiveContainer width="100%" height="90%">
                {/*//* Line chart */}
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    {/*//* X-axis */}
                    <XAxis dataKey="name" />

                    {/*//* Y-axis */}
                    <YAxis />

                    {/*//* Tooltip */}
                    <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />

                    {/*//* Legend */}
                    <Legend />

                    {/*//* Line for 'visit' data */}
                    <Line type="monotone" dataKey="visit" stroke="#8884d8" strokeDasharray="5 5" />

                    {/*//* Line for 'click' data */}
                    <Line type="monotone" dataKey="click" stroke="#82ca9d" strokeDasharray="5 5" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

// Export the Chart component
export default Chart;
