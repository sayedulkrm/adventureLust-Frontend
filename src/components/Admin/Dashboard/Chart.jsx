import React from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    ArcElement,
    Legend,
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    ArcElement,
    Legend
);

export const LineChart = ({ dataArray = [] }) => {
    const labels = getLastYearMonth();

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: "Yearly Views",
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: "Views",
                data: dataArray.map((item) => item.views),

                borderColor: "rgba(107,70,193,1)",
                backgroundColor: "#6b46c1",
            },

            {
                label: "Users",
                data: dataArray.map((item) => item.users),

                borderColor: "rgba(214,43,129,1)",
                backgroundColor: "rgba(214,43,129,0.3)",
            },
            {
                label: "Subscription",
                data: dataArray.map((item) => item.subscription),

                borderColor: "rgba(250,240,137,1)",
                backgroundColor: "#faf089",
            },
        ],
    };

    return <Line options={options} data={data} />;
};

export const DoughnutChart = ({ usersSubscriptionDetails = [] }) => {
    const data = {
        labels: ["Subscribe", "Not Subscribe"],
        datasets: [
            {
                label: "Views",
                data: usersSubscriptionDetails,

                borderColor: ["rgb(62,12,171)", "rgb(214,43,129)"],
                backgroundColor: [
                    "rgba(62,12,171,0.3)",
                    "rgba(214,43,129,0.3)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Doughnut data={data} />;
};

function getLastYearMonth() {
    const labels = [];

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const currentMonth = new Date().getMonth();

    const remain = 11 - currentMonth;

    for (let i = currentMonth; i < months.length; i--) {
        const element = months[i];
        labels.unshift(element);
        if (i === 0) break;
    }

    for (let i = 11; i > currentMonth; i--) {
        if (i === currentMonth) break;
        const element = months[i];
        labels.unshift(element);
    }

    return labels;
}
