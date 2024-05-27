import { ReactElement } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { Column } from "react-table";
import { useState, useCallback } from "react";
import TableHOC from "../components/TableHOC";
import userImg from "../assets/userpic.png";
import { FaRegBell, FaTrash } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];
const img = "https://randomuser.me/api/portraits/women/54.jpg";
const img2 = "https://randomuser.me/api/portraits/women/50.jpg";

const arr: DataType[] = [
  {
    avatar: (
      <img
        style={{
          borderRadius: "50%",
        }}
        src={img}
        alt="Shoes"
      />
    ),
    name: "Emily Palmer",
    email: "emily.palmer@example.com",
    gender: "female",
    role: "user",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },

  {
    avatar: (
      <img
        style={{
          borderRadius: "50%",
        }}
        src={img2}
        alt="Shoes"
      />
    ),
    name: "May Scoot",
    email: "aunt.may@example.com",
    gender: "female",
    role: "user",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
];

const Customers = () => {
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
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      filter ? filteredData : data,
      "dashboard-product-box",
      "Customers",
      true
    ),
    [filter]
  );

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard">
        <div className="bar" style={{ marginBottom: "10px" }}>

          <FaRegBell />
          <img src={userImg} alt="User" />
        </div>
        <div className="filter-bar">
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

export default Customers;
