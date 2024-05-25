import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, removeTodo } from "../actions/index";
import "./Todo.css";

function Todo() {
  //initial state
  const [recipe, setRecipe] = useState({})
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch();
  const list = useSelector((state) => state.todoreducers.list);

  const validate = () => {
    //To validate the state
    setErrors({});
    let isValid = true;
    let validation = [
      { field: 'first_name', msg: 'Please enter First Name.' },
      { field: 'last_name', msg: 'Please enter Last Name.' },
      { field: 'mobile_number', msg: 'Please enter Mobile Number(Numeric).' },
      { field: 'email', msg: 'Please enter Email Address.' }

    ];

    validation.map(item => {
      if (!recipe[item.field] || recipe[item.field].length <= 0) {
        setErrors(errors => ({ ...errors, [item.field]: item.msg }));
        isValid = false;
      }
      return item;
    });

    return isValid;
  };

  const AddData = () => {
    //to add the data in TODO
    if (validate()) {
      dispatch(addTodo(recipe))
      let data = { first_name: "", last_name: "", mobile_number: "", email: "" }
      setRecipe({ ...data })
    }
  }

  const handleChange = (prop, value) => {
    //setting value in recipe
    setRecipe(recipe => ({ ...recipe, [prop]: value }));
  };

  return (
    <>
      <div className="card">
        <h1>TODO list</h1>
        <div>
          <div>
            <input
              className="form-control"
              placeholder="First Name"
              type="text"
              value={recipe.first_name}
              onChange={(e) => handleChange('first_name', e.target.value)}
            />{" "}
            {errors.first_name && <div className="text-danger text-left"><small>{errors.first_name}</small></div>}
          </div>

          <div className="mt-1">
            <input
              className="form-control"
              placeholder="Last Name"
              type="text"
              value={recipe.last_name}
              onChange={(e) => handleChange('last_name', e.target.value)}
            />{" "}
            {errors.last_name && <div className="text-danger text-left"><small>{errors.last_name}</small></div>}
          </div>

          <div className="mt-1">
            <input
              className="form-control"
              placeholder="Mobile Number"
              type="text"
              maxLength="10"
              pattern="[0-9]*"
              value={recipe.mobile_number}
              onChange={(e) => handleChange('mobile_number', (e.target.validity.valid) ? e.target.value : recipe.mobile_number)}
            />{" "}
            {errors.mobile_number && <div className="text-danger text-left"><small>{errors.mobile_number}</small></div>}
          </div>

          <div className="mt-1">
            <input
              className="form-control"
              placeholder="Email"
              type="text"
              value={recipe.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />{" "}
            {errors.email && <div className="text-danger text-left"><small>{errors.email}</small></div>}
          </div>

          <div className="mt-3">
            <button className="btn-primary" onClick={AddData}>
              Add
            </button>
          </div>
        </div>

        <div className="mt-3">
          <hr />
          <div><b>TODO LIST DATA</b></div>
          <hr />
          {list && list.length > 0 ?
            <div>
              {list.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between border mt-1"
                  >
                    <div>
                      <span><b className="text-left">First Name: </b> {item.data.first_name}</span><br />
                      <span><b>Last Name: </b> {item.data.last_name}</span><br />
                      <span><b>mobile Number: </b> {item.data.mobile_number}</span><br />
                      <span><b>Email: </b> {item.data.email}</span>
                    </div>
                    <div>
                      <button className="btn-danger" onClick={() => dispatch(deleteTodo(item.id))}>
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div> :
            <div> No data to Preview... </div>
          }
        </div>

        {list.length > 0 && (
          <button className="mt-5 btn-danger" onClick={() => dispatch(removeTodo())}>
            Delete All
          </button>
        )}
      </div>
    </>
  );
}

export default Todo;
