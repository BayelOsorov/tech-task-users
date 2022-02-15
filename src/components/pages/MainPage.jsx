import React, { useEffect, useState } from "react";

import { Form, FormControl, Table } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUsers } from "../redux/actions";

import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [payStatusValue, setPayStatusValue] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  let obj = new URLSearchParams(window.location.search);
  const filterAndSearchUsers = (key, value) => {
    obj.set(key, value);
    let newUrl = `${window.location.pathname}?${obj.toString()}`;
    if (value === "all") {
      navigate("/");
    } else {
      navigate(newUrl);
    }
    dispatch(getUsers());
    setPayStatusValue(value);
  };

  return (
    <div className="container">
      <FormControl
        placeholder="Поиск"
        className="w-50 mt-5 mb-5"
        onChange={(e) => filterAndSearchUsers(`q`, e.target.value)}
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
      />
      <h5>Сортировка по статусу платежа</h5>
      <Form.Group
        className="mb-3"
        value={payStatusValue}
        controlId="formBasicEmail"
        onChange={(e) => {
          filterAndSearchUsers("pay_status", e.target.value);
        }}
      >
        <Form.Check
          defaultChecked
          block="true"
          label="Все"
          value="all"
          name="pay_status"
          type="radio"
          id="inline-radio-1"
        />
        <Form.Check
          block="true"
          label="Оплачено"
          value="true"
          name="pay_status"
          type="radio"
          id="inline-radio-2"
        />
        <Form.Check
          block="true"
          label="Не оплачено"
          value="false"
          name="pay_status"
          type="radio"
          id="inline-radio-3"
        />
      </Form.Group>
      {users ? (
        <>
          <Table striped bordered hover style={{ fontSize: "12px" }}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Имя</th>
                <th>Фамилие</th>
                <th>Имя пользователя</th>
                <th>Статус платежа</th>
              </tr>
            </thead>

            <tbody>
              {users.map((item) => (
                <tr
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <td component="th" scope="row">
                    {item.email}
                  </td>
                  <td align="right">{item.first_name}</td>
                  <td align="right">{item.last_name}</td>
                  <td align="right">{item.username}</td>
                  {item.pay_status ? (
                    <td style={{ backgroundColor: "green" }} align="right">
                      Оплачен
                    </td>
                  ) : (
                    <td style={{ backgroundColor: "red" }} align="right">
                      Не оплачен
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default MainPage;
