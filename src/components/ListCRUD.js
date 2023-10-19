import { useState, useEffect } from "react";
export default function ListOperations() {
  const [jsonData, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [formData, setFormData] = useState({
    Name: "",
    Age: 0,
    BloodGroup: "",
  });
  const limit = 5;
  let page = Math.floor(allData.length / limit);
  const pageMod = allData.length % limit;
  if (pageMod != 0) page = page + 1;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(() => ({ ...formData, [name]: value }));
    console.log(formData);
  };
  const editChange = (obj) => {
    console.log("hi", obj);
    setFormData(() => obj);
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
  const handleSubmit = (event) => {
    const addData = {
      Name: formData.Name,
      Age: formData.Age,
      BloodGroup: formData.BloodGroup,
    };
    let x = [...jsonData];
    let y = [...allData];
    if (formData.id) {
      x.forEach((item) => {
        if (item.id == formData.id) {
          return (
            (item.Name = addData.Name),
            (item.Age = addData.Age),
            (item.BloodGroup = addData.BloodGroup)
          );
        }
      });
    }
    event.preventDefault();
    if (formData.id > 0) {
      let reponse = fetch(
        "https://6529349955b137ddc83e61ad.mockapi.io/api/v1/crud/" +
          formData.id,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(addData),
        }
      )
        .then((response) => response.json)
        .then((res) => {
          alert("Item " + formData.id + " updated successfully");
          setData(x);
          setFormData({ Name: "", Age: 0, BloodGroup: "", id: 0 });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let maxId = Math.max(...allData.map((o) => o.id));
      console.log(maxId, "maxId");
      let reponse = fetch(
        "https://6529349955b137ddc83e61ad.mockapi.io/api/v1/crud",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(addData),
        }
      )
        .then((response) => response.json)
        .then((res) => {
          alert("Item added successfully");
          addData.id = maxId + 1;
          x.push(addData);
          y.push(addData);
          if (x.length < limit) setData(x);
          setAllData(y);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div class="container-lg py-5">
      <h2 class="pb-3">React CRUD Operations</h2>
      <form onSubmit={handleSubmit}>
        <input type="hidden" value={formData.id}></input>
        <div class="form-group">
          <label>Name</label>
          <input
            type="text"
            name="Name"
            class="form-control w-50"
            value={formData.Name}
            onChange={handleChange}
          ></input>
        </div>
        <div class="form-group py-2">
          <label>Age</label>
          <input
            type="number"
            name="Age"
            class="form-control w-50"
            value={formData.Age}
            onChange={handleChange}
          ></input>
        </div>
        <div class="form-group">
          <label>BloodGroup</label>
          <input
            type="text"
            name="BloodGroup"
            class="form-control w-50"
            value={formData.BloodGroup}
            onChange={handleChange}
          ></input>
        </div>
        <button type="submit" class="btn-default my-3">
          Submit
        </button>
      </form>
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
                <button onClick={() => editChange(data)}>{data.id}</button>
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
