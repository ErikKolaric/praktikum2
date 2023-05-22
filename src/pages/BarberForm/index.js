import { Form, Row, Col, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddBarber, CheckIfBarberAccountIsApplied } from "../../apicalls/barbers";
import { ShowLoader } from "../../redux/loaderSlice";

function BarberForm() {
    const [days, setDays] = useState([])
    const [alreadyApplied, setAlreadyApplied ] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const onFinish = async (values) =>{
        try {
            dispatch(ShowLoader(true))
            const payload = {
                ...values,
                days,
                userId: JSON.parse(localStorage.getItem("user")).id,
                status: "pending",
                role: "barber"
            }
            const response = await AddBarber(payload);
            if(response.success) {
                message.success(response.message)
                navigate("/profile")
            } else {
                message.error(response.message)
            }
            dispatch(ShowLoader(false))
        } catch (error) {
            dispatch(ShowLoader(false))
            message.error(error.message)
        }
    }

    const checkIfAlreadyApplied = async () => {
        try {
            dispatch(ShowLoader(true))
            const response = await CheckIfBarberAccountIsApplied(
                JSON.parse(localStorage.getItem("user")).id
            )
            console.log(response)
            if(response.success) {
                setAlreadyApplied(true)
            } 
            dispatch(ShowLoader(false))
        } catch (error) {
            dispatch(ShowLoader(false))
            message.error(error.message)
        }
    }


    useEffect(() => {
        checkIfAlreadyApplied() 
    }, [])
    return (
        <div className="bg-white p-2">
            {!alreadyApplied && 
                <>
                    <h3 className="uppercase my-2">Apply for a Barber Account</h3>
                    <hr />
                    <Form layout="vertical" className="my-1" onFinish={onFinish}>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <h4 className="uppercase">
                                    <b>Personal Information</b>
                                </h4>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="First Name" name="firstName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Required"
                                        },
                                    ]}
                                >
                                    <input type="text" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Last Name" name="lastName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Required"
                                        },
                                    ]}
                                >
                                    <input type="text" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Email" name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Required"
                                        },
                                    ]}
                                >
                                    <input type="email" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Phone" name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Required"
                                        },
                                    ]}
                                >
                                    <input type="number" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Website" name="website"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Required"
                                        },
                                    ]}
                                >
                                    <input type="text" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Adress" name="adress"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Required"
                                        },
                                    ]}
                                >
                                    <textarea type="text" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Gender" name="gender"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Required"
                                        },
                                    ]}
                                >
                                    <select>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Experience(years)" name="experience"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Required"
                                        },
                                    ]}
                                >
                                    <input type="number" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <hr />
                            </Col>
                            <Col span={24}>
                                <h4 className="uppercase">
                                    <b>Work Hours</b>
                                </h4>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Start Time" name="startTime"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Required"
                                        },
                                    ]}
                                >
                                    <input type="time" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="End Time" name="endTime"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Required"
                                        },
                                    ]}
                                >
                                    <input type="time" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Fee" name="fee"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Required"
                                        },
                                    ]}
                                >
                                    <input type="number" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <div className="flex gap-3">
                                    {[
                                    "Monday", 
                                    "Tuesday", 
                                    "Wednesday", 
                                    "Thursday", 
                                    "Friday", 
                                    "Saturday", 
                                    "Sunday"
                                    ].map((day, index) => (
                                        <div className="flex gap-1 items-center">
                                            <input type="checkbox" key={index} value={day} 
                                            onChange={(e) => {
                                                if(e.target.checked) {
                                                    setDays([...days, e.target.value])
                                                } else {
                                                    setDays(days.filter((item) => item !== e.target.value))
                                                }
                                            }
                                            } />
                                            <label>{day}</label>
                                        </div>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                        <div className="flex justify-end gap-2">
                            <button className="outlined-btn" type="button">CANCEL</button>
                            <button className="contained-btn" type="submit">SUBMIT</button>
                        </div>
                    </Form>
                </>
            }
            {alreadyApplied && 
                <div className="flex flex-col items-center gap-2">
                    <h3 className="text-secondary">You have already applied for the Barber Account, wait for approval</h3>
                </div>
            }
        </div>
    )
}

export default BarberForm;