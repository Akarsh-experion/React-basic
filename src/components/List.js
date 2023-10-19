import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
function List() {
  const [jsonData, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  let navigate = useNavigate();
  const limit = 5;
  let page = Math.floor(allData.length / limit);
  const pageMod = allData.length % limit;
  const routeChange = () => {
    navigate("/addData");
  };
  if (pageMod != 0) page = page + 1;
  useEffect(() => {
    getlistData();
  }, []);
  const getlistData = () => {
    fetch(
      "https://6529349955b137ddc83e61ad.mockapi.io/api/v1/crud/?completed=false&page=1&limit=5"
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((datas) => {
        setData(datas);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getalllistData();
  }, []);
  const getalllistData = () => {
    fetch("https://6529349955b137ddc83e61ad.mockapi.io/api/v1/crud/")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((datas) => {
        setAllData(datas);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const deleteId = (id) => {
    let prevData = [...jsonData];
    let prevAllData = [...allData];
    prevAllData = prevAllData.filter((x) => x.id != id);
    let updatedData = prevData.filter((x) => x.id != id);
    let response = fetch(
      "https://6529349955b137ddc83e61ad.mockapi.io/api/v1/crud/" + id,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json)
      .then((res) => {
        alert("Item " + id + " Deleted successfully");
        if (prevData.length != 1) setData(updatedData);
        setAllData(prevAllData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getPage = (id) => {
    let response = fetch(
      "https://6529349955b137ddc83e61ad.mockapi.io/api/v1/crud/?completed=false&page=" +
        id +
        "&limit=5"
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((datas) => {
        console.log(datas);
        alert("get page " + id);
        setData(datas);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div class="container-lg p-5">
      <div class="row py-4">
        <div class="col-9">
          <h2>User Details</h2>
        </div>
        <div class="col-3 my-auto">
          <button type="button" onClick={routeChange} class="btn-default">
            AddData
          </button>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>BloodGroup</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {jsonData.map((data) => (
            <tr>
              <td>{data.id}</td>
              <td>{data.Name}</td>
              <td>{data.Age}</td>
              <td>{data.BloodGroup}</td>
              <td>
                <a href={"/addData/" + data.id}>{data.id}</a>
              </td>
              <td>
                <button onClick={() => deleteId(data.id)}>{data.id}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div class="py-3">
        {Array(page)
          .fill()
          .map((x, index) => (
            <button
              type="btn-default d-inline p-2"
              onClick={() => getPage(index + 1)}
              value={index + 1}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
}
export default List;
