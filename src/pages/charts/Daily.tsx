import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { LineChart } from "../../components/Charts";
import { Select, DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "react-datepicker/dist/react-datepicker.css";
import { dailyData } from "./data/dailydata";

dayjs.extend(isBetween); // Extend dayjs with isBetween plugin

const { RangePicker } = DatePicker;
const { Option } = Select;

const Daily = () => {
  // State to manage the date range
  const [dateRange, setDateRange] = useState<[string, string]>([
    dayjs().subtract(7, "days").format("YYYY-MM-DD"),
    dayjs().format("YYYY-MM-DD"),
  ]);

  // State to manage the selected range in days
  const [selectedRange, setSelectedRange] = useState<string>("7");

  // State to manage filtered data
  const [filteredData, setFilteredData] = useState(dailyData);

  // Handle change in predefined range selection
  const handleRangeChange = (value: string) => {
    setSelectedRange(value);
    const endDate = dayjs().format("YYYY-MM-DD");
    const startDate = dayjs()
      .subtract(parseInt(value), "days")
      .format("YYYY-MM-DD");
    setDateRange([startDate, endDate]);
  };

  // Handle change in custom date picker
  const handleDateChange = (
    dates: [Dayjs | null, Dayjs | null],
    dateStrings: [string, string]
  ) => {
    if (dates && dates[0] && dates[1]) {
      const startDate = dateStrings[0];
      const endDate = dateStrings[1];
      setSelectedRange("Custom");
      setDateRange([startDate, endDate]);
    }
  };

  // Effect to filter data based on date range
  useEffect(() => {
    const [startDate, endDate] = dateRange;
    const filtered = dailyData.filter((data) => {
      const date = dayjs(data.date, "YYYY-MM-DD");
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
            value={[dayjs(dateRange[0]), dayjs(dateRange[1])]}
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
