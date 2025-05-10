import { useSelector } from "react-redux";
import { selectAllUsers } from "@/redux/features/user/allUserSlice";
import { selectProducts, TProduct } from "@/redux/features/products/productSlice";
import { selectOrders, TOrder } from "@/redux/features/order/orderSlice";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

const Overview = () => {
  const users = useSelector(selectAllUsers);
  console.log("users: ", users);
  const products = useSelector(selectProducts);
  const orders = useSelector(selectOrders);

  // Prepare data for User Status Bar Chart
  const userStatusCounts = users.reduce(
    (acc: { [key: string]: number }, user: { status: string }) => {
      acc[user.status] = (acc[user.status] || 0) + 1;
      return acc;
    },
    { active: 0, deactivated: 0 } // Corrected typo: "diactivated" to "deactivated"
  );

  const userStatusData = {
    labels: ["Active", "Deactivated"], // Corrected label: "Diactivated" to "Deactivated"
    datasets: [
      {
        label: "Number of Users",
        data: [userStatusCounts.active, userStatusCounts.deactivated], // Corrected key: "diactivated" to "deactivated"
        backgroundColor: ["#4CAF50", "#F44336"],
        borderColor: ["#388E3C", "#D32F2F"],
        borderWidth: 1,
      },
    ],
  };

  const userStatusOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "User Status Distribution" },
    },
  };

  // Prepare data for Product Categories Pie Chart
  const productCategories = products.reduce(
    (acc: { [key: string]: number }, product: TProduct) => {
      acc[product.type] = (acc[product.type] || 0) + 1;
      return acc;
    },
    {}
  );

  const productCategoryData = {
    labels: Object.keys(productCategories),
    datasets: [
      {
        label: "Product Categories",
        data: Object.values(productCategories),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        borderColor: ["#FF4D67", "#2E8BC0", "#FFC107", "#3CAEA3", "#7F39FB"],
        borderWidth: 1,
      },
    ],
  };

  const productCategoryOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Product Categories Distribution" },
    },
  };

  // Prepare data for Orders Over Time Line Chart
  const ordersByDate = orders.reduce(
    (acc: { [key: string]: number }, order: TOrder) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {}
  );

  const sortedDates = Object.keys(ordersByDate).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const ordersData = {
    labels: sortedDates,
    datasets: [
      {
        label: "Orders",
        data: sortedDates.map((date) => ordersByDate[date]),
        fill: false,
        borderColor: "#42A5F5",
        backgroundColor: "#42A5F5",
        tension: 0.1,
      },
    ],
  };

  const ordersOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Orders Over Time" },
    },
    scales: {
      x: { title: { display: true, text: "Date" } },
      y: { title: { display: true, text: "Number of Orders" }, beginAtZero: true },
    },
  };

  return (
    <div data-aos="fade-down">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Status Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="h-64">
            <Bar data={userStatusData} options={userStatusOptions} />
          </div>
        </div>

        {/* Product Categories Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="h-64">
            <Pie data={productCategoryData} options={productCategoryOptions} />
          </div>
        </div>

        {/* Orders Over Time Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="h-64">
            <Line data={ordersData} options={ordersOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;