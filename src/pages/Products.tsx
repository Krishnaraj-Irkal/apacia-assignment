import { ReactElement, useCallback, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { FaPlus, FaRegBell } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import userImg from "../assets/userpic.png";


interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg";

const arr: DataType[] = [
  {
    photo: <img src={img} alt="Shoes" />,
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: <Link to="/product/jordans">Manage</Link>,
  },

  {
    photo: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/product/sdaskdnkasjdn">Manage</Link>,
  },
  {
    photo: <img src={img} alt="Shoes" />,
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: <Link to="/product/sajknaskd">Manage</Link>,
  },

  {
    photo: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/product/sdaskdnkasjdn">Manage</Link>,
  },
  {
    photo: <img src={img} alt="Shoes" />,
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: <Link to="/product/sajknaskd">Manage</Link>,
  },

  {
    photo: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/product/sdaskdnkasjdn">Manage</Link>,
  },
  {
    photo: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/product/sdaskdnkasjdn">Manage</Link>,
  },
];

const Products = () => {
  const [data] = useState<DataType[]>(arr);
  const [filter, setFilter] = useState("");

  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setFilter(e.currentTarget.value);
    }
  }, []);

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      filter ? filteredData : data,
      "dashboard-product-box",
      "Products",
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
            <input type="text" placeholder="Search products" value={filter}
              onChange={handleFilterChange}
              onKeyPress={handleKeyPress} />
          </div>
          <Link to="/product/new">
            <button>
              <FaPlus />Add new button
            </button>
          </Link>
        </div>
        {Table()}</main>
    </div>
  );
};

export default Products;
