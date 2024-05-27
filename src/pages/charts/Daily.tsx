import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { LineChart } from "../../components/Charts";
import { Select, DatePicker } from "antd";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { dailyData } from "./data/dailydata";

const { RangePicker } = DatePicker;
const { Option } = Select;

const Daily = () => {
  // State to manage the date range
  const [dateRange, setDateRange] = useState<[string, string]>([
    moment().subtract(7, "days").format("YYYY-MM-DD"),
    moment().format("YYYY-MM-DD"),
  ]);

  // State to manage the selected range in days
  const [selectedRange, setSelectedRange] = useState<string>("7");

  // State to manage filtered data
  const [filteredData, setFilteredData] = useState(dailyData);

  // Handle change in predefined range selection
  const handleRangeChange = (value: string) => {
    setSelectedRange(value);
    const endDate = moment().format("YYYY-MM-DD");
    const startDate = moment()
      .subtract(parseInt(value), "days")
      .format("YYYY-MM-DD");
    setDateRange([startDate, endDate]);
  };

  // Handle change in custom date picker
  const handleDateChange = (
    dates: [moment.Moment | null, moment.Moment | null] | null
  ) => {
    if (dates && dates[0] && dates[1]) {
      const startDate = dates[0].format("YYYY-MM-DD");
      const endDate = dates[1].format("YYYY-MM-DD");
      setSelectedRange("Custom");
      setDateRange([startDate, endDate]);
    }
  };

  // Effect to filter data based on date range
  useEffect(() => {
    const [startDate, endDate] = dateRange;
    const filtered = dailyData.filter((data) => {
      const date = moment(data.date, "YYYY-MM-DD");
      return date.isBetween(startDate, endDate, null, "[]");
    });
    setFilteredData(filtered);
  }, [dateRange]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Chart of daily sales</h1>
        <div className="chart-filter-bar">
          <RangePicker
            value={[moment(dateRange[0]), moment(dateRange[1])]}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
          />
          <Select
            value={selectedRange}
            onChange={handleRangeChange}
            style={{ width: "150px" }}
          >
            <Option value="7">Last 7 Days</Option>
            <Option value="30">Last 30 Days</Option>
            <Option value="90">Last 90 Days</Option>
          </Select>
        </div>
        <section>
          <LineChart
            data={{
              totalSales: filteredData.map((item) => item.totalSales),
              totalUnits: filteredData.map((item) => item.totalUnits),
            }}
            labels={filteredData.map((item) => item.date)}
            borderColor="rgba(75,192,192,1)"
          />
        </section>
      </main>
    </div>
  );
};

export default Daily;
