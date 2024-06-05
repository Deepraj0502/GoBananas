import * as React from "react";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function Table() {
  const [weatherData, setWeatherData] = React.useState([]); //store table rows data from API in weatherData react state
  const [loading, setLoading] = React.useState(true); // show skeleton until data fetch initially true
  // Columns Data
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "condition", headerName: "Condition", width: 200 },
    { field: "temp", headerName: "Avg Temp", width: 150 },
    { field: "humidity", headerName: "Avg Humidity", width: 150 },
    { field: "prec", headerName: "Total Precipitation", width: 160 },
    { field: "wind", headerName: "Wind Speed", width: 150 },
    { field: "rain", headerName: "Change of rain", width: 150 },
  ];
  useEffect(() => {
    // fetching data from Weather API using fetch
    fetch(
      "http://api.weatherapi.com/v1/forecast.json?key=329c527d51ce48c9a0c140500240506&q=Mumbai&days=10&aqi=no&alerts=no"
    )
      .then((response) => response.json())
      .then((json) => {
        let rows = []; // local row variable declared
        json.forecast.forecastday.map((e, idx) =>
          rows.push({
            id: idx + 1,
            date: e.date,
            condition: e.day.condition.text,
            temp: e.day.avgtemp_c,
            humidity: e.day.avghumidity,
            prec: e.day.totalprecip_mm + " mm",
            wind: e.day.maxwind_kph + " kph",
            rain: e.day.daily_chance_of_rain + "%",
          })
        ); // pushed data into rows from API row-wise
        setWeatherData(rows); // stored local rows array to weatherData state
        setLoading(false); // set loading false
      });
  }, []);

  return (
    // Table from MUI
    <div style={{ height: "auto", width: "100%" }}>
      {/* When data not loaded from API */}
      {loading && (
        <Box sx={{ width: "100%" }}>
          <Skeleton animation="wave" height={60} />
          <Skeleton animation="wave" height={60} />
          <Skeleton animation="wave" height={60} />
          <Skeleton animation="wave" height={60} />
          <Skeleton animation="wave" height={60} />
          <Skeleton animation="wave" height={60} />
        </Box>
      )}
      {/* When data loaded from API */}
      {!loading && (
        <DataGrid
          rows={weatherData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
        />
      )}
      {/* Hover on column names to perform filter/sort/search */}
    </div>
  );
}
