# OnTraQ Productivity Dashboard

_COMPANY_: CODTECH IT SOLUTIONS

_NAME_: DON FERRIDA D

_INTERN ID_: CT04DG3262

_DOMAIN_: FULL STACK WEB DEVELOPMENT

_DURATION_: 4 WEEKS

_MENTOR_: NEELA SANTOSH

# OnTraQ – Chrome Extension for Time Tracking and Productivity Analytics

Welcome to **OnTraQ**, a smart and intuitive Chrome Extension designed to **track the time users spend on different websites** and **visualize their productivity** through a clean and interactive dashboard. Built using **JavaScript (Chrome Extension APIs)** for the frontend, **Node.js with Express** for the backend, and **MongoDB** for data storage, OnTraQ offers insightful weekly reports and classification of productive vs unproductive time. This tool is ideal for students, developers, and professionals seeking self-awareness and productivity enhancement.

# Features

> Chrome Extension that runs silently in the background and tracks time spent on active tabs.

> Lightweight client-side script that detects tab activity and domain changes.

> Backend API to log time spent per website in real time.

> MongoDB database to store detailed time logs for each user.

> Classification of websites into productive (e.g., GitHub, StackOverflow) and unproductive (e.g., YouTube, Instagram).

> Interactive dashboard that displays:
>
> - Total time spent per day (bar chart)
> - Weekly breakdown of productive vs unproductive time
> - Most and least visited websites per day
> - Tooltip insights with productivity indicators (green/red dots)

> Fully dark-themed dashboard UI with colorful bar charts and modern design.

# Project Objectives

> To create a browser-integrated time tracking tool that helps users reflect on their digital behavior.

> To build a modular system that separates concerns across the **Chrome extension**, **API server**, and **React-based dashboard**.

> To implement productivity logic by mapping domains to a curated list of “productive” and “unproductive” sites.

> To allow simulated demo usage through database seeding for evaluation and presentation purposes.

> To ensure clarity in visual analytics, with intuitive chart designs and minimal UI distractions.

# How It Works

Once installed, the **OnTraQ Chrome Extension** listens for tab updates and activity changes. When a user actively browses a site, the extension logs time spent on that domain and sends it to the backend via a POST request. The server groups time logs by date and domain and stores them in a MongoDB collection.

The **React dashboard** fetches this data from the backend and generates a week-long overview. Users can view time spent each day, productivity ratios, and key insights like the most visited website. Color-coded charts, summary cards, and hover tooltips enhance the user experience while maintaining simplicity.

All analytics are presented for a fixed `demo` user to simplify testing and demonstration without authentication.

# Integration

To simulate realistic productivity data, the project includes a script that **seeds the database** with 7 days of demo logs. Domains are randomly chosen from a mix of productive and unproductive sites. Each log contains time spent and the date it occurred. The server aggregates this data for frontend visualization.

On the **frontend**, the dashboard uses `axios` to fetch weekly time logs. The `recharts` library renders the bar chart, and conditional logic determines productivity labels and indicators. This integration allows for seamless back-and-forth communication between the extension, backend, and dashboard.

# Tech Stack

**Frontend (Dashboard):**

- React.js
- Tailwind CSS
- Recharts (charting library)
- Axios (API client)

**Chrome Extension:**

- JavaScript
- Chrome Tabs and Runtime APIs

**Backend:**

- Node.js
- Express.js
- MongoDB
- Mongoose ODM

# Installation & Running Locally

**Backend:**

git clone https://github.com/your-repo/ontraq-extension.git

cd backend

npm install

npm run dev

**Seeding Data:**

node scripts/seedLogs.js

**Frontend Dashboard:**

cd frontend

npm install

npm start

**Chrome Extension Setup:**

1. Open Chrome and navigate to `chrome://extensions`
2. Enable **Developer Mode**
3. Click "Load Unpacked" and select the `extension/` folder
4. Open a few websites and switch tabs
5. Check network logs or the backend to verify tracking

# Screenshots

![img](https://github.com/user-attachments/assets/ccf740ac-194a-4412-b43a-96657797bfd3)

![img](https://github.com/user-attachments/assets/3150db41-360d-4ee2-afba-ab6e563f613c)

![img](https://github.com/user-attachments/assets/632a67a6-a3d7-430a-8264-ebdaea202558)

![img](https://github.com/user-attachments/assets/2791d6e1-8a7b-49e7-8265-53fc28f410e7)

![img](https://github.com/user-attachments/assets/b34c69d2-25a4-48a5-9cfe-55287586839b)

![img](https://github.com/user-attachments/assets/8b4acf45-d0b4-4e79-babc-b5bc7a997e16)

![img](https://github.com/user-attachments/assets/df532a89-0681-4060-86a5-67134d3396d7)

# What I Learned from This Project

> Gained hands-on experience with the **Chrome Extensions API** and how to track user tab activity efficiently.

> Understood the importance of optimizing data updates without overwhelming the backend using **interval tracking** and **active tab detection**.

> Learned how to use **MongoDB aggregations** to group and summarize daily usage data.

> Designed a **dark-themed analytics dashboard** with real-time charts and tooltips using React and Recharts.

> Practiced managing data flow between multiple components: extension → backend → frontend.

> Improved backend debugging with error handling and logging for better data integrity.

# Improvements

> Currently, the extension tracks only the foreground active tab. Background activity or idle detection can be enhanced.

> No user authentication — future versions may include user accounts and login features.

> Dashboard is limited to weekly view — monthly or custom ranges can be added later.

> Extension could show a popup summary or allow temporary pause/resume tracking.

## License

This project is open-source and intended for educational use only. Domain classifications are customizable, and tracking respects user privacy by storing only domains and duration, without any content or personal identifiers.

---

## About the Author

Built with a focus on clarity, productivity, and full-stack architecture.
Feel free to fork this project, contribute improvements, or explore productivity further!
