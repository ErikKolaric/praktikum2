import { Col, Row, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShowLoader } from "../../redux/loaderSlice";
import { GetAllUsers } from "../../apicalls/users";
import {GetAllBarbers} from "../../apicalls/barbers"

const Home = () => {
    const [barbers = [], setBarbers] = React.useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(ShowLoader(true))
            const response = await GetAllBarbers();
           if (response.success) {
            setBarbers(response.data);
           } else {
            message.error(response.message);
           }
            dispatch(ShowLoader(false))
        } catch (error) {
            message.error(error.message);
            dispatch(ShowLoader(false))
        }
    }

    useEffect(() => {
        getData()
    }, []);

    const navigate = useNavigate()

    return(
        <div className="flex justify-between">
            <div>
                <input placeholder="Search barbers" className="w-200" />
            </div>
            <div>
            <Row gutter={[16, 16]} className="my-1" >
            {barbers.map((barber) => {
                return (
                <Col span={8}>
                    <div className="bg-white p-1 flex-col gap-1 uppercase w-400 cursor-pointer" 
                    onClick={() => navigate('/book-apointment/ ${barber.id}')}> // zasto nama nije kao u videu $barber.id plave boje???
                    <div className="flex justify-between w-full
                    ">
                    
                    
                        <h2 className="uppercase">
                            {barber.firstName} {barber.lastName}
                        </h2>

                    </div> <br />

                    <div className="flex justify-between w-full">
                    <h4>
                            <b>
                                 Experience:
                            </b>
                        </h4>
                        <h4>
                            {barber.experience}
                            Years 
                        </h4>
                        </div>
                    <div className="flex justify-between w-full">
                    <h4>
                            <b>
                                 Email:
                            </b>
                        </h4>
                        <h4>
                            {barber.email} 
                        </h4>

                        </div>
                        <div className="flex justify-between w-full">
                        <h4>
                            <b>
                                 Phone:
                            </b>
                        </h4>
                        <h4>
                            {barber.phone} 
                        </h4>
                        </div>
                        
</div>
                </Col>
            );
                })}
            </Row>
            </div>
            <button className="outlined-btn my-1" onClick={() => navigate("/apply-barber")}>Apply Barber</button>
        </div>
    
            )}

export default Home;
