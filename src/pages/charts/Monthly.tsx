import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { BarChart } from "../../components/Charts";
import { DatePicker } from "antd";
import moment from "moment";
import { MonthlyData } from "./data/monthlyData";

// Define the type of MonthlyData
interface MonthlyDataType {
  [year: string]: {
    month: string;
    totalSales: number;
    totalUnits: number;
  }[];
}

const monthlyData: MonthlyDataType = MonthlyData; // Explicitly type MonthlyData

const Monthly = () => {
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [filteredData, setFilteredData] = useState(
    monthlyData[selectedYear.toString()] || []
  );

  const handleYearChange = (date: moment.Moment | null) => {
    if (date) {
      const year = date.year();
      setSelectedYear(year);
      setFilteredData(monthlyData[year.toString()] || []);
    }
  };

  const totalSalesData = filteredData.map(
    (item) => item.totalSales
  );
  const totalUnitsData = filteredData.map(
    (item) => item.totalUnits
  );
  const months = filteredData.map((item) => item.month);

  // Set the default value of the DatePicker to the first day of the selected year
  const defaultPickerValue = moment()
    .year(selectedYear)
    .startOf("year");

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Chart of monthly sales</h1>
        <div className="chart-filter-bar">
          <DatePicker
            onChange={handleYearChange}
            picker="year"
            defaultValue={defaultPickerValue}
          />
        </div>
        <section>
          <BarChart
            data_1={totalSalesData}
            data_2={totalUnitsData}
            title_1="Total Sales"
            title_2="Total Units"
            bgColor_1="rgba(75, 192, 192, 0.6)"
            bgColor_2="rgba(192, 75, 192, 0.6)"
            labels={months}
          />
        </section>
      </main>
    </div>
  );
};

export default Monthly;
