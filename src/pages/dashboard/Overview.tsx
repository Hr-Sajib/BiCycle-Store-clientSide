/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "@/redux/features/user/allUserSlice";
import { selectProducts, TProduct } from "@/redux/features/products/productSlice";
import { selectOrders, TOrder } from "@/redux/features/order/orderSlice";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from "chart.js";
import AOS from "aos";
import "aos/dist/aos.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

const Overview = () => {
  const users = useSelector(selectAllUsers);
  const products = useSelector(selectProducts);
  const orders = useSelector(selectOrders);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 20,
    });
  }, []);

  // Summary Metrics
  const totalUsers = users.length;
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum: number, order: TOrder) => sum + (order.totalPrice || 0), 0);

  // Prepare data for User Status Bar Chart
  const userStatusCounts = users.reduce(
    (acc: { [key: string]: number }, user: { status: string }) => {
      acc[user.status] = (acc[user.status] || 0) + 1;
      return acc;
    },
    { active: 0, deactivated: 0 }
  );

  const userStatusData = {
    labels: ["Active", "Deactivated"],
    datasets: [
      {
        label: "Number of Users",
        data: [userStatusCounts.active, userStatusCounts.deactivated],
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

// Prepare data for Top Selling Products Bar Chart
const productOrderCounts: any = {};

orders.forEach(order => {
  order.products.forEach(product => {
    const productId = (product as any)?.productId?._id;
    if (productId) {
      productOrderCounts[productId] = (productOrderCounts[productId] || 0) + product?.quantity;
    }
  });
});

console.log("productOrderCounts: ", productOrderCounts);


  const topSellingProducts = Object.entries(productOrderCounts)
    .map(([productId, quantity]) => {
      const product = products.find((p: TProduct) => p._id === productId);
      return { name: product?.name || "Unknown", quantity };
    })
    .filter((item) => item.name !== "Unknown")
    .sort((a: any, b: any) => b.quantity - a.quantity)
    .slice(0, 5);

  const topSellingData = {
    labels: topSellingProducts.map((item) => item.name),
    datasets: [
      {
        label: "Quantity Sold",
        data: topSellingProducts.map((item) => item.quantity),
        backgroundColor: "#FF9800",
        borderColor: "#F57C00",
        borderWidth: 1,
      },
    ],
  };

  const topSellingOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Top 5 Selling Products" },
    },
  };

  // Prepare data for Order Status Pie Chart
  const orderStatusCounts = orders.reduce(
    (acc: { [key: string]: number }, order: TOrder) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    },
    { unpaid: 0, paid: 0, processing: 0, delivered: 0 } // Updated statuses
  );

  const orderStatusData = {
    labels: ["Unpaid", "Paid", "Processing", "Delivered"],
    datasets: [
      {
        label: "Order Status",
        data: [
          orderStatusCounts.unpaid,
          orderStatusCounts.paid,
          orderStatusCounts.processing,
          orderStatusCounts.delivered,
        ],
        backgroundColor: ["#EF5350", "#FFCA28", "#26C6DA", "#66BB6A"], // Adjusted colors
        borderColor: ["#D32F2F", "#FFB300", "#00ACC1", "#43A047"],
        borderWidth: 1,
      },
    ],
  };

  const orderStatusOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Order Status Distribution" },
    },
  };

  // Prepare data for Revenue Over Time Line Chart
  const revenueByDate = orders.reduce(
    (acc: { [key: string]: number }, order: TOrder) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + (order.totalPrice || 0);
      return acc;
    },
    {}
  );

  const revenueData = {
    labels: sortedDates,
    datasets: [
      {
        label: "Revenue ($)",
        data: sortedDates.map((date) => revenueByDate[date]),
        fill: false,
        borderColor: "#AB47BC",
        backgroundColor: "#AB47BC",
        tension: 0.1,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Revenue Over Time" },
    },
    scales: {
      x: { title: { display: true, text: "Date" } },
      y: { title: { display: true, text: "Revenue ($)" }, beginAtZero: true },
    },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" data-aos="fade-down">
        Overview
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="flex w-full gap-5">
          <div className="bg-gradient-to-r w-full from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md" data-aos="fade-up">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-3xl font-bold mt-2">{totalUsers}</p>
          </div>
          <div className="bg-gradient-to-r w-full from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-3xl font-bold mt-2">{totalProducts}</p>
          </div>
        </div>
        <div className="flex w-full gap-5">
          <div className="bg-gradient-to-r w-full from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-lg font-semibold">Total Orders</h3>
            <p className="text-3xl font-bold mt-2">{totalOrders}</p>
          </div>
          <div className="bg-gradient-to-r w-full from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-3xl font-bold mt-2">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Status Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md" data-aos="fade-up">
          <div className="h-64">
            <Bar data={userStatusData} options={userStatusOptions} />
          </div>
        </div>

        {/* Product Categories Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="100">
          <div className="h-64">
            <Pie data={productCategoryData} options={productCategoryOptions} />
          </div>
        </div>

        {/* Orders Over Time Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="200">
          <div className="h-64">
            <Line data={ordersData} options={ordersOptions} />
          </div>
        </div>

        {/* Top Selling Products Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md" data-aos="fade-up">
          <div className="h-64">
            <Bar data={topSellingData} options={topSellingOptions} />
          </div>
        </div>

        {/* Order Status Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="100">
          <div className="h-64">
            <Pie data={orderStatusData} options={orderStatusOptions} />
          </div>
        </div>

        {/* Revenue Over Time Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="200">
          <div className="h-64">
            <Line data={revenueData} options={revenueOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;