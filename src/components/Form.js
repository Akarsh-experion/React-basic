import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
function Form() {
  const [formData, setFormData] = useState({
    Name: "",
    Age: 0,
    BloodGroup: "",
  });
  let navigate = useNavigate();
  let userId = 0;
  const params = useParams();
  if (params.id) userId = params.id;
  let formType = "Add User";
  if (userId > 0) formType = "Edit User";
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(() => ({ ...formData, [name]: value }));
  };

  useEffect(() => {
    if (userId > 0) getDataById();
  }, []);

  const getDataById = () => {
    fetch("https://6529349955b137ddc83e61ad.mockapi.io/api/v1/crud/" + userId)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((datas) => {
        setFormData(datas);
      })
      .catch((err) => {
        navigate("/error");
        console.log(err.message);
      });
  };
  const handleSubmit = (event) => {
    const addData = {
      Name: formData.Name,
      Age: formData.Age,
      BloodGroup: formData.BloodGroup,
    };
    event.preventDefault();
    if (userId > 0) {
      let reponse = fetch(
        "https://6529349955b137ddc83e61ad.mockapi.io/api/v1/crud/" + userId,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(addData),
        }
      )
        .then((response) => response.json)
        .then((res) => {
          alert("Item " + userId + " updated successfully");
          navigate("/list");
        })
        .catch((err) => {
          console.log(err);
          navigate("/error");
        });
    } else {
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
          navigate("/list");
        })
        .catch((err) => {
          navigate("/error");
          console.log(err);
        });
    }
  };
  return (
    <div class="container-lg py-5">
      <h2 class="py-3">{formType}</h2>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
}
export default Form;
