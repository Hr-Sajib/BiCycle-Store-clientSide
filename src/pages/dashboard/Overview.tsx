import React from "react";
import { useOutletContext } from "react-router-dom";

const Overview = () => {
  const { openUpdateModal, closeUpdateModal, openAddModal, closeAddModal, openUpdateOrderModal, closeUpdateOrderModal } = useOutletContext<{
    openUpdateModal: (product: any) => void;
    closeUpdateModal: () => void;
    openAddModal: () => void;
    closeAddModal: () => void;
    openUpdateOrderModal: (order: any) => void;
    closeUpdateOrderModal: () => void;
  }>();

  return (
    <div data-aos="fade-down">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Overview</h2>
      <p className="text-center text-gray-600">Welcome to the admin overview. This section can be customized to show key metrics or a summary of users, products, and orders.</p>
    </div>
  );
};

export default Overview;