import { Column } from "react-table";
import AdminSidebar from "../components/AdminSidebar";
import { ReactElement, useState, useCallback } from "react";
import TableHOC from "../components/TableHOC";
import userImg from "../assets/userpic.png";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { Select } from "antd";

const { Option } = Select;

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "User",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const arr: DataType[] = [
  {
    user: "Charas",
    amount: 4500,
    discount: 400,
    quantity: 3,
    status: <span className="red">Processing</span>,
    action: <Link to="/transaction/sajknaskd">Manage</Link>,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: <span className="green">Shipped</span>,
    quantity: 6,
    action: <Link to="/transaction/sajknaskd">Manage</Link>,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: <span className="purple">Delivered</span>,
    quantity: 6,
    action: <Link to="/transaction/sajknaskd">Manage</Link>,
  },
];

const Transaction = () => {
  const [data] = useState<DataType[]>(arr);
  const [filter, setFilter] = useState("");

  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  }, []);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setFilter(e.currentTarget.value);
      }
    },
    []
  );
  console.log("filter", filter)

  const filteredData = data.filter(item =>
    item.user.toLowerCase().includes(filter.toLowerCase())
  );

  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      filter ? filteredData : data,
      "dashboard-product-box",
      "Transactions",
      true
    ),
    [filter]
  );

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard">
        <div className="bar" style={{ marginBottom: "10px" }}>
          <BsSearch />
          <input type="text" placeholder="Search for data, users, docs" />
          <FaRegBell />
          <img src={userImg} alt="User" />
        </div>
        <div className="filter-bar">
          <Select defaultValue='all' className="status-filter">
            <Option value="all">All Status</Option>
            <Option value="Processing">Processing</Option>
            <Option value="Shipped">Shipped</Option>
            <Option value="Delivered">Delivered</Option>
          </Select>
          <div className="search-bar">
            <BsSearch className="search-icon" />
            <input type="text" placeholder="Search Customers" value={filter}
              onChange={handleFilterChange}
              onKeyPress={handleKeyPress} />
          </div>
        </div>
        {Table()}
      </main>
    </div>
  );
};

export default Transaction;
