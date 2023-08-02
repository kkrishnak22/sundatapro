import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DataTable from "../components/DataTable";
import "./style.css";
import { useNavigate } from "react-router-dom";
export default function CustomerList() {
  const [customerList, setCustomerList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModelOpen, setIsEditModelOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({});
  // cus -> edited Customer details
  const [cus, setCus] = useState({});
  const [runUseEffect, setRunUseEffect] = useState("YES");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  async function handleAddCustomer(e) {
    e.preventDefault();

    console.log("add cus clicked");
    console.log(newCustomer);

    try {
      const res = await axios.post(
        "/sunbase/portal/api/assignment.jsp",
        newCustomer,
        {
          params: {
            cmd: "create",
          },
          headers: {
            Authorization: `Bearer ${token}`,
            
          }, 
        }
      );

      if (res.status === 201) {
        console.log(res.data);
        console.log(res.status);
        alert("Customer Added")
        setCustomerList((prev) => {
          return [...prev, customerList];
        });
        setIsModalOpen(false);
        setRunUseEffect("NO");
      }
    } catch (e) {}
  }

  useEffect(() => {
    async function getAllCustomers() {
      try {
        const res = await axios.get("/sunbase/portal/api/assignment.jsp", {
          params: {
            cmd: "get_customer_list",
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status >= 300) {
          throw Error("failed");
        }
        const data = await res.data;
        console.log(data);
        setCustomerList(data);
      } catch (e) {
        console.log(e);
      }
    }

    getAllCustomers();
  }, [runUseEffect]);

  const tableDetails = customerList.map((cus, index) => {
    return (
      <tr key={index} className="row">
        <td className="info">{index + 1}</td>
        <td className="info">{cus.first_name}</td>
        <td className="info">{cus.last_name}</td>
        <td className="info">{cus.street}</td>
        <td className="info">{cus.address}</td>
        <td className="info">{cus.city}</td>
        <td className="info">{cus.email}</td>
        <td className="info">{cus.phone}</td>
        <td>
          <button
            onClick={() => {
              handleEdit(cus);
            }}
          >
            edit
          </button>
        </td>
        <td>
          <button
            onClick={() => {
              handleDelete(cus);
            }}
          >
            delete
          </button>
        </td>
      </tr>
    );
  });

  function handleChange(e) {
    e.preventDefault();

    const { name, value } = e.target;
    setNewCustomer((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleChangeEdit(e) {
    console.log(e.target.value);
    const { name, value } = e.target;
    setCus((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleEdit(singleCustomer) {
    setIsEditModelOpen(true);
    setCus(singleCustomer);
  }

  async function handleEditSubmitButton(e) {
    e.preventDefault();
    console.log("edited cus",cus);
    try {
      const res = await axios.post("/sunbase/portal/api/assignment.jsp", cus, {
        params: {
          cmd: "update",
          uuid: cus.uuid,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log(res.status);
        alert("Customer Edited");

        setIsEditModelOpen(false);
        setRunUseEffect("Edited");
        return;
      }
      alert(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(customer) {
    console.log(customer.uuid);
    try {
      const res = await axios.post(
        "/sunbase/portal/api/assignment.jsp",
        customer,
        {
          params: {
            cmd: "delete",
            uuid: customer.uuid,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        console.log(res.status);
        alert("Customer Deleted");

      const filterCustomer =  customerList.filter((cun)=>{
          return  customer.uuid !== cun.uuid
        })
        console.log("deleted",filterCustomer)
        setCustomerList(filterCustomer)
        // setRunUseEffect("Run");
        
        return;
      }
      alert(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1>All Customer Details  <span onClick={()=>{
        localStorage.removeItem("token")
        navigate("/")
      }} className="logout">Logout</span>  </h1>

      <div>
        <button
          id="floating-button"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Add
        </button>
        <Modal isOpen={isModalOpen}>
          <div>
            <h2>Add Customer Data</h2>
            <div className="new-customer-flex">
              <div>
                <div className="input-container">
                  <input
                    placeholder="first name"
                    name="first_name"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-container">
                  <input
                    placeholder="Street"
                    name="street"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-container">
                  <input
                    placeholder="City"
                    name="city"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-container">
                  <input
                    placeholder="Email"
                    name="email"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <div className="input-container">
                  <input
                    placeholder="Last name"
                    name="last_name"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-container">
                  <input
                    placeholder="Address"
                    name="address"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-container">
                  <input
                    placeholder="State"
                    name="state"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-container">
                  <input
                    placeholder="Phone"
                    name="phone"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="modal-buttons">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                close
              </button>
              <button onClick={handleAddCustomer}>submit</button>
            </div>
          </div>
        </Modal>

        <div>
          {customerList.length === 0 ? (
            <h2>Loading all customers detials plase wait..........</h2>
          ) : (
            <div></div>
          )}
          {
            <table>
              <thead>
                <tr>
                  <td className="info">Id</td>
                  <td className="info"> First Name </td>
                  <td className="info"> Last Name </td>
                  <td className="info"> Street </td>
                  <td className="info"> Address </td>
                  <td className="info"> City </td>
                  <td className="info"> Email </td>
                  <td className="info"> Phone </td>
                  <td>edit</td>
                  <td>delete</td>
                </tr>
              </thead>
              <tbody>{tableDetails}</tbody>
            </table>
          }

          <div></div>
          <Modal isOpen={isEditModelOpen}>
            <button
              onClick={() => {
                setIsEditModelOpen(false);
              }}
            >
              close
            </button>
            <h2>Edit Customer</h2>

            <div className="new-customer-flex">
              <div>
                <div className="input-container">
                  <input
                    placeholder="first name"
                    name="first_name"
                    type="text"
                    value={cus.first_name}
                    onChange={handleChangeEdit}
                  />
                </div>
                <div className="input-container">
                  <input
                    placeholder="Street"
                    name="street"
                    type="text"
                    value={cus.street}
                    onChange={handleChangeEdit}
                  />
                </div>
                <div className="input-container">
                  <input
                    placeholder="City"
                    name="city"
                    type="text"
                    value={cus.city}
                    onChange={handleChangeEdit}
                  />
                </div>
                <div className="input-container">
                  <input
                    placeholder="Email"
                    name="email"
                    type="text"
                    value={cus.email}
                    onChange={handleChangeEdit}
                  />
                </div>
              </div>

              <div>
                <div className="input-container">
                  <input
                    placeholder="Last name"
                    name="last_name"
                    type="text"
                    value={cus.last_name}
                    onChange={handleChangeEdit}
                  />
                </div>
                <div className="input-container">
                  <input
                    placeholder="Address"
                    name="address"
                    type="text"
                    value={cus.address}
                    onChange={handleChangeEdit}
                  />
                </div>
                <div className="input-container">
                  <input
                    placeholder="State"
                    name="state"
                    type="text"
                    value={cus.state}
                    onChange={handleChangeEdit}
                  />
                </div>
                <div className="input-container">
                  <input
                    placeholder="Phone"
                    name="phone"
                    type="text"
                    value={cus.phone}
                    onChange={handleChangeEdit}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleEditSubmitButton}>submit</button>
          </Modal>
        </div>
      </div>
    </div>
  );
}
