import styled from "styled-components";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import ButtonBlue from "../elements/ButtonBlue";
import { useNavigate } from 'react-router-dom';
import ButtonBlueOutlined from '../elements/ButtonBlueOutlined';
import Card from 'react-bootstrap/Card';
import Loading from "../elements/Loading";


export default function JobDetails() {

    const [posts, setPosts] = useState(null)
    const [errorMessage, seterrorMessage] = useState("")
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(`https://nz-locum-backend-3a82ed85ab97.herokuapp.com/jobs/search/id/${id}`)
            .then(res => {
                console.log(res.data)
                setPosts(res.data[0])

            })
            .catch(err => {
                console.log(err)
                seterrorMessage('Error retrieving data')
            })
    }, []) //only do get request on load


    // Loading state while data is being fetched
    if (!posts && !errorMessage) {
        return (
            <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Loading />
            </div>
        );
    }

    // Error state
    if (errorMessage) {
        return (
            <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <h3>Error: {errorMessage}</h3>
                <ButtonBlue onClick={() => { navigate(-1) }} name="Go Back" size='med' style={{ marginTop: "20px" }}></ButtonBlue>
            </div>
        );
    }

    // Data loaded successfully
    return (
        <div id="Doctor-login">
            {posts && (
                <Wrapper style={{ height: '100%' }}>
                    <div>
                        <h6><b>Job ID: </b> {posts._id}</h6>
                        <br></br>
                        <br></br>
                        <h1>{posts.job_title}</h1>
                        <h5>
                            {posts.location}, New Zealand
                        </h5>
                        <br></br>
                        <Card.Link href={`mailto:${posts.email}`}><ButtonBlue name="Email Company" style={{ marginRight: 30 }} size='sml'></ButtonBlue></Card.Link>
                        <Card.Link href={`tel:${posts.phone}`}><ButtonBlueOutlined name="Call Job Lister" style={{ marginRight: 30 }} size='sml'></ButtonBlueOutlined></Card.Link>
                        <hr></hr>

                        <p><b>Email: </b>{posts.email}</p>
                        <p><b>Phone: </b>{posts.phone}</p>
                        <p><b> Specialities: </b>{posts.specialities}</p>
                        <hr></hr>
                        <br></br>
                        <h5>Job Descriptions</h5>
                        <br></br>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{posts.descriptions}</p>

                        <br></br>
                        <ButtonBlue onClick={() => { navigate(-1) }} name="Back" size='med'></ButtonBlue>
                    </div>
                </Wrapper>
            )}
        </div>
    );
}


const Wrapper = styled.section`
          padding: 100px 10%;
          width: auto;
          display: flex;
          height: 100vh;
          `;

