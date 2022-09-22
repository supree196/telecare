import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ApiService from "../Service/ApiService";
import Accordian from "./Accordian";
import Pagination from "./pagination";
import "./doctor_list.css";
import axios from "axios";
import { BASE_URL } from "../environment";

const DoctorList = () => {
  const [list, setList] = useState([]);
  const [listPaginate, setListPaginate] = useState([]);
  const [slot, setSlot] = useState([]);

  const [totalRes, setTotalRes] = useState(0);
  const [active, setActive] = useState(1);
  const [pagination, setPagination] = useState(1);
  const [limitVal, setLimitVal] = useState(6);

  useEffect(() => {
    getDoctor();
    getSlots();
  }, []);

  useEffect(() => {
    if (list != []) {
      filterData();
    }
  }, [list]);

  useEffect(() => {
    if (list != []) {
      filterData();
    }
  }, [active, pagination]);

  function getDoctor() {
    ApiService.getData("/api/v1/doctors").then((res) => {
      setList(res.data);
      setTotalRes(res.data.length);
    });
  }

  function getSlots() {
    axios.get(`${BASE_URL}/appointment-service/api/v3/slots`).then((res) => {
      //console.log('slots data-->',res.data)
      setSlot(res.data);
    });
  }

  const getPageContent = async (e) => {
    setActive(Number(e.target.value));
    setPagination(e.target.value * 1);
    // filterData()
  };

  const preBack = async (e) => {
    setActive(Number(e));
    setPagination(e * 1);
    // filterData()
  };

  const setLimitval = async (e) => {
    setLimitVal(Number(e.target.value));
  };

  function updateList() {
    getSlots();
  }

  function filterData() {
    const indexOfLastPost = active * limitVal;
    const indexOfFirstPost = indexOfLastPost - limitVal;
    const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);
    setListPaginate(currentPosts);
  }

  return (
    <Container className="doctor_cont" fluid>
      <div className="DoctorPageHead ">
        <h1 className="heading mt-2">Doctors</h1>
        <div className=" d-flex flex-column justify-content-center align-items-end  w-100 ">
          <Pagination
            totalPosts={totalRes}
            paginate={getPageContent}
            postsPerPage={limitVal}
            active={active}
            page={pagination}
            preBack={preBack}
          />
        </div>
      </div>

      <Container
        className="card_cont d-flex flex-wrap justify-content-start"
        fluid
      >
        {listPaginate.map((doctor, i) => {
          return (
            <Accordian
              key={doctor.id}
              list={doctor}
              index={i}
              slot={slot}
              updateList={updateList}
            />
          );
        })}
      </Container>
    </Container>
  );
};

export default DoctorList;
