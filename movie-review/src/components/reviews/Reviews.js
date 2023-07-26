import { useEffect, useRef } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from "../reviewForm/ReviewForm";

import React from 'react'

const Reviews = ({getMovieData, movie, reviews , setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, []);

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;
        try{
            const response = await api.post("/api/v1/reviews", { reviewBody: rev.value, imdbId: movieId });
            const updatedReviews = [...reviews,{body: rev.value}];
            rev.value = "";
            setReviews(updatedReviews);
        }
        catch(error){
            console.log(error);
        }
        
    }

  return (
    <Container>
        
        <Row className="mt-2">
        <Row>
                <Col> <h3 style={{'fontWeight':'bolder', 'color':'silver'}}>  Reviews</h3> </Col>
            </Row>
            <Col>
                <img src={movie?.poster} style={{'width':'350px','height':'500px'}} alt="" />
            </Col>
            <Col>
                <Row>
                    <Row>
                        <Col> <h3 style={{'fontWeight':'bolder', 'color':'gold'}}> {movie?.title}  </h3> </Col>
                    </Row>
                    <Row>
                                            <Col>
                                                <br />
                                            </Col>
                                        </Row> 
                   
                    
                    <Row>
                        <Col> <h5 style={{'fontWeight':'bolder', 'color':'silver'}}>  Released on  </h5> </Col>
                        <Col> <h5 style={{'fontWeight':'bolder'}}>  {movie?.releaseDate}  </h5> </Col>
                    </Row>
                    <Row>
                                            <Col>
                                                <br />
                                            </Col>
                                        </Row> 
                    <Row>
                        <Col> <h5 style={{'fontWeight':'bolder', 'color':'silver'}}>Genre</h5> </Col>
                        <Col> 
                        <h5 style={{'fontWeight':'bolder'}}> 
                        {movie?.genres.map((g) => {return <>
                                        <Row>
                                            <Col>{g}</Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <br />
                                            </Col>
                                        </Row>                                
                                    </>})
                                    } 
                                    </h5> </Col>

                    </Row>
                </Row>
            
                <Row>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm revText={revText} labelText="Write a review" handleSubmit={addReview} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                </Row>
                
            </Col>
        </Row>
        <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        <Row>
            <Col>
            {
                            reviews?.map((r) => {
                                return(
                                    <>
                                        <Row>
                                            <Col>{r.body}</Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <hr />
                                            </Col>
                                        </Row>                                
                                    </>
                                )
                            })
            }
            </Col>
        </Row>
    </Container>
  )
}

export default Reviews