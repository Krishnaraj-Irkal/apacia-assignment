import AdminSidebar from "../../components/AdminSidebar";
import { DoughnutChart, PieChart } from "../../components/Charts";

const salesByCategory = [
  { heading: "Shoes", value: 6515 },
  { heading: "Clothing", value: 22803 },
  { heading: "Accessories", value: 16288 },
  { heading: "Misc", value: 19545 }
];

const Breakdown = () => {
  const labels = salesByCategory.map((item) => item.heading);
  const data = salesByCategory.map((item) => item.value);

  // Function to generate random HSL color codes
  const getRandomColor = (value) => {
    const hue = Math.floor(Math.random() * 360); // Random hue value (0-360)
    const saturation = Math.floor(Math.random() * 50) + 50; // Random saturation value (50-100)
    const lightness = 50; // Fixed lightness value
    return `hsl(${hue},${saturation}%,${lightness}%)`;
  };

  // Generate random HSL color codes for each category based on value
  const backgroundColor = data.map((value) => getRandomColor(value));

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Breakdown of Sales By Category</h1>

        <section>
          <div>
            <DoughnutChart
              labels={labels}
              data={data}
              backgroundColor={backgroundColor}
              legends={false}
              offset={[0, 0, 0, 0]}
            />
          </div>
        </section>

      </main>
    </div>
  );
};

export default Breakdown;
