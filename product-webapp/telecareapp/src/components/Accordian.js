import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import moment from "moment";
import ApiService from "../Service/ApiService";
import "./doctor_list.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { createMeeting } from "../Service/VideoService";
import axios from "axios";
import { BASE_URL } from "../environment";

const Accordian = (props) => {
  const [expanded, setExpanded] = useState(``);
  const [date, SetDate] = useState(moment().format("DD-MM-YYYY"));
  const [newdate, SetnewDate] = useState(moment().format("YYYY-MM-DD"));
  const [slot, setSlot] = useState([]);
  const [takeSlot, setTakeSlot] = useState({});
  const [currSlot, setCurrSlot] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChangeDate = (x) => {
    SetnewDate(moment(new Date(x.target.value)).format("YYYY-MM-DD"));
    SetDate(moment(new Date(x.target.value)).format("DD-MM-YYYY"));
    handleShow();
  };

  useEffect(() => {
    filterSlots();
  }, [date]);

  function filterSlots() {
    //console.log(date)
    let filteredSlots = [];
    filteredSlots = props.slot
      .filter((x) => x.doctorEmail == props.list.doctorEmailId)
      .filter((x) => x.slotDate == date)
      .filter((x) => x.slotAvailable == true);
    setSlot(filteredSlots);
    //console.log(filteredSlots)
  }

  async function bookAppointement() {
    const id = await createMeeting();

    let slotObj = {
      id: Math.random().toString(36).slice(2),
      appointmentId: 1,
      patientEmail: localStorage.getItem("loginId"),
      doctorEmail: takeSlot.doctorEmail,
      patientIssue: "Shortness of breath",
      slotId: takeSlot.slotId,
      appointmentDate: takeSlot.slotDate,
      appointmentStartTime: takeSlot.slotStartTime,
      appointmentEndTime: takeSlot.slotEndTime,
      appointmentStatus: "true",
      meetingId: id,
    };

    axios
      .post(`${BASE_URL}/appointment-service/api/v3/appointment`, slotObj)
      .then(
        (res) => {
          //console.log(res)
          ApiService.tostSuccess(`Appointment Booked`);
          setCurrSlot();
          handleClose();
          SetnewDate(moment().format("YYYY-MM-DD"));
          SetDate(moment().format("DD-MM-YYYY"));
          setSlot(slot.splice(currSlot, 1));
          sendEmail();
          //updateSlotStatus(Number(takeSlot.slotId))
        },
        (err) => {
          ApiService.tostErr("Error occured");
        }
      );
  }

  function sendEmail() {
    const obj = {
      receiverEmail: localStorage.getItem("loginId"),
      subject: "Telecare Appointement",
      messageBody: "Your Appointment is successfully booked",
    };
    axios.post(`${BASE_URL}/email-service/api/v1/sendEmail`, obj).then(
      (res) => {
        ApiService.tostSuccess(`Email sent`);
      },
      (err) => {
        ApiService.tostErr("Error occured");
      }
    );
  }

  function updateSlotStatus(id) {
    let obj = {
      slotAvailable: "false",
    };
    ApiService.updateData(`/slots/${id}`, obj).then((res) => {
      //console.log(res.data)
      props.updateList();
      setSlot(slot.splice(currSlot, 1));
      setCurrSlot();
      filterSlots();
    });
  }

  return (
    <>
      <div
        className="accordion col-12 col-md-6 col-lg-4 padding"
        id="accordionExample"
      >
        <div className="accordion-item">
          <Card id={`heading${props.index}`} style={{ background: "white" }}>
            <Card.Img
              variant="top"
              src={
                props.list.doctorImage
                  ? `data:image/jpeg;base64,${props.list.doctorImage}`
                  : "../../../dummydoctor.jpg"
              }
              height="270px"
              width="100%"
            />
            <Card.Body>
              <div className="flex-column w-100 d-flex justify-content-center align-items-center mb-2">
                <div className="row w-100 h-25 d-flex justify-content-center align-items-center">
                  <div className="w-50 fs-6">{props.list.doctorName}</div>
                  {/* <div className="w-50 fs-6"></div> */}
                  <div className="w-50 fs-6">{props.list.doctorEmailId}</div>
                </div>
                <div className="row w-100 h-25 d-flex justify-content-center align-items-center">
                  <div className="w-50 fs-6">{`${props.list.experience} yrs exp`}</div>
                  <div className="w-50 fs-6">{props.list.specialization}</div>
                </div>
              </div>
              {/* <input
                type="date"
                className="cardDate"
                value={newdate}
                onChange={onChangeDate}
                onClick={handleShow}
              /> */}
              <button
                className="btn btn-secondary w-100 bookBtn"
                onClick={handleShow}
              >
                Check slots
              </button>

              {/* <button className={expanded == `collapse${props.index}` ? 'accordion-button p-0' : 'accordion-button collapsed p-0'} onClick={() => setExpanded(`collapse${props.index}`)} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${props.index}`} aria-expanded={expanded == `collapse${props.index}`} aria-controls={`collapse${props.index}`}>
              </button> */}
            </Card.Body>
          </Card>
          {/* <div id={`collapse${props.index}`} className={expanded == `collapse${props.index}` ? 'accordion-collapse collapse show' : 'accordion-collapse collapse'} aria-labelledby={`heading${props.index}`} data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="row m-auto">
                <div className="col-12  ">
                  <input type="date" value={newdate} onChange={onChangeDate} />
                </div>
                <div className="row m-auto slotCont mt-2">
                  {slotAvilable}
                  { slotAvilable && <div className="text-center mt-2 fs-5"><p>Sorry ! no slots avilable { slotAvilable} </p></div> }

                  {slot.map((slot, i) => (
                    <div className="col-12 col-lg-6 col-lg-4 mt-1">
                      <button
                        className="btn btn-secondary slotBtn w-100 d-flex justify-content-around align-items-center"
                        onClick={() => {
                          setTakeSlot(slot);
                          setCurrSlot(i);
                        }}
                      >
                        {slot.slotStartTime.slice(0, 5) +
                          slot.slotStartTime.slice(8, 11)}{" "}
                        -{" "}
                        {slot.slotEndTime.slice(0, 5) +
                          slot.slotEndTime.slice(8, 11)}{" "}
                        {i === currSlot && (
                          <i class="fa fa-check" aria-hidden="true"></i>
                        )}{" "}
                      </button>
                    </div>
                  ))}
                </div>
                {slot.length != 0 && (
                  <div className="col-12 mt-2">
                    <button
                      className="btn btn-secondary w-100 bookBtn "
                      onClick={() => bookAppointement()}
                      disabled={currSlot == null}
                    >
                      Book Appoinment {currSlot == null}{" "}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <Modal show={show} size="lg" onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Pick your slot for{" "}
            <input
              type="date"
              className="modaldate"
              value={newdate}
              onChange={onChangeDate}
              min={moment().format("YYYY-MM-DD")}
            />{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row m-auto slotCont mt-2">
            {slot.length == 0 && (
              <div className="text-center mt-2 fs-5">
                <p>Sorry ! no slots avilable </p>
              </div>
            )}

            {slot.map((slot, i) => (
              <div className="col-12 col-lg-4 col-lg-4 mt-1">
                <button
                  className="btn btn-secondary slotBtn w-100 d-flex justify-content-around align-items-center"
                  onClick={() => {
                    setTakeSlot(slot);
                    setCurrSlot(i);
                  }}
                >
                  {slot.slotStartTime.slice(0, 5) +
                    slot.slotStartTime.slice(8, 11)}{" "}
                  -{" "}
                  {slot.slotEndTime.slice(0, 5) + slot.slotEndTime.slice(8, 11)}{" "}
                  {i === currSlot && (
                    <i class="fa fa-check" aria-hidden="true"></i>
                  )}{" "}
                </button>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary w-100 bookBtn "
            onClick={() => bookAppointement()}
            disabled={currSlot == null}
          >
            Book Appoinment {currSlot == null}{" "}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Accordian;
