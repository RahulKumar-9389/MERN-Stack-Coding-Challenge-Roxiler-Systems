# Roxiler Product Transaction API & Frontend Task

## Overview

This project involves building an API that interacts with a third-party API, processes the data, and stores it in a database. The API will support various endpoints that provide transaction listings, statistics, and chart data based on the month selected by the user.

Additionally, a frontend interface is required to display the transaction data, statistics, and charts based on the available APIs.

## Table of Contents

- [Backend Tasks](#backend-tasks)
  - [API to Initialize the Database](#api-to-initialize-the-database)
  - [API to List All Transactions](#api-to-list-all-transactions)
  - [API for Statistics](#api-for-statistics)
  - [API for Bar Chart](#api-for-bar-chart)
  - [API for Pie Chart](#api-for-pie-chart)
  - [API to Fetch Combined Data](#api-to-fetch-combined-data)
- [Frontend Tasks](#frontend-tasks)
  - [Transactions Table](#transactions-table)
  - [Transactions Statistics](#transactions-statistics)
  - [Transactions Bar Chart](#transactions-bar-chart)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)

---

## Backend Tasks

### API to Initialize the Database

- **Endpoint**: `POST /api/init`
- **Description**: Fetches data from the third-party API (`https://s3.amazonaws.com/roxiler.com/product_transaction.json`) and initializes the database with seed data.
- **Request**: None (initializes the database with fetched data).
- **Response**: A success or failure message based on the process.

---

### API to List All Transactions

- **Endpoint**: `GET /api/transactions`
- **Parameters**:
  - `month`: The month of the transactions (Jan, Feb, Mar, etc.)
  - `search`: Optional search query to match against product title, description, or price.
  - `page`: Page number for pagination (default: 1).
  - `per_page`: Number of records per page (default: 10).
  
- **Description**: Lists all transactions of the selected month. Supports search and pagination.
- **Response**: JSON object with transaction data for the selected month.

---

### API for Statistics

- **Endpoint**: `GET /api/statistics`
- **Parameters**:
  - `month`: The month to calculate statistics for.

- **Description**: Returns statistics for the selected month.
  - Total sale amount
  - Total number of sold items
  - Total number of not sold items
  
- **Response**: JSON object containing the statistics for the selected month.

---

### API for Bar Chart

- **Endpoint**: `GET /api/bar-chart`
- **Parameters**:
  - `month`: The month for which the bar chart data is requested.

- **Description**: Provides data for a bar chart showing the price range and the number of items within each range for the selected month. Price ranges are defined as:
  - 0 - 100
  - 101 - 200
  - 201 - 300
  - 301 - 400
  - 401 - 500
  - 501 - 600
  - 601 - 700
  - 701 - 800
  - 801 - 900
  - 901 and above
  
- **Response**: JSON object with price range and item count.

---

### API for Pie Chart

- **Endpoint**: `GET /api/pie-chart`
- **Parameters**:
  - `month`: The month for which the pie chart data is requested.

- **Description**: Provides the count of unique categories and the number of items within each category for the selected month.
- **Response**: JSON object with category names and item counts.

---

### API to Fetch Combined Data

- **Endpoint**: `GET /api/combined`
- **Parameters**:
  - `month`: The month for the combined data.

- **Description**: Combines the data from all previous APIs (transactions, statistics, bar chart, pie chart) and returns a unified JSON response.
- **Response**: A JSON object containing the results from the transactions, statistics, bar chart, and pie chart APIs.

---

## Frontend Tasks

### Transactions Table

- Use the `GET /api/transactions` API to list transactions in a table.
- A month dropdown should allow the user to select a month (default: March).
- A search box should allow searching based on product title, description, or price.
- Pagination should allow moving between pages of transaction data.
- The table should update dynamically based on the selected month and search query.

### Transactions Statistics

- Display the total sale amount, total sold items, and total not sold items for the selected month using the `GET /api/statistics` API.
- The statistics should update dynamically based on the selected month from the dropdown.

### Transactions Bar Chart

- Display a bar chart that shows the price range and the number of items in that range for the selected month using the `GET /api/bar-chart` API.
- The chart should update dynamically based on the selected month.

### Transactions Pie Chart

- Display a pie chart showing unique categories and the number of items in each category for the selected month using the `GET /api/pie-chart` API.
- The chart should update dynamically based on the selected month.

---

## Tech Stack

- **Backend**: 
  - Node.js with Express (or any other framework of choice)
  - MongoDB (or relational DB if preferred)
  - Axios or fetch for API calls to the third-party service

- **Frontend**: 
  - React (or any other frontend framework of choice)
  - Chart.js or any other charting library for bar and pie charts
  - Axios or fetch for API calls to the backend

---

## Setup Instructions

### Backend Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
