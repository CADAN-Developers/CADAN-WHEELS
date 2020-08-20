import React, { Component } from "react";
import './DriverHome.css';


import Navigation from '../components/Navigation'


class DriverHome extends Component {

    render() {
        return (
            <div>
                {/* Navegation */}
                < Navigation title="Driver" />

                {/* Body */}
                <br></br>
                <div id="div_content" class="row d-flex justify-content-center">
                    <div class="col-lg-3 col-md-12 mb-4">

                        <div class="card text-center">
                            <div class="card-header">
                                <b>PANEL</b>
                            </div>
                            <div class="card-body ">

                                <p class="card-text">
                                    <img class="rounded-circle z-depth-2" alt="100x100" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(3).jpg"
                                        data-holder-rendered="true" />
                                </p>
                                <p>
                                    JULIAN SANCHEZ
                                </p>
                                <a class="card-link">Add Car</a>
                                <a class="card-link">Withdraw</a>
                            </div>
                        </div>

                    </div>
                    <div class="col-lg-8 col-md-6 mb-4">

                        <div class="card text-center">
                            <div class="card-header">
                                <b>Last Trips</b>
                            </div>
                            <div class="card-body">
                                <div id="div_content" class="row d-flex justify-content-center">

                                    {/* <!-- Card content --> */}
                                    <div class=" col-lg-4 col-md-6 mb-4">

                                        <div class="card ">
                                            <div class="card-header">
                                                <img class="rounded-circle z-depth-2" alt="100x100" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(31).jpg"
                                                    data-holder-rendered="true" />
                                            </div>
                                            <div class="card-body">
                                                <h5 class="card-title">MARIA GONZALEZ</h5>
                                                <p class="card-text">UNIVERSITARIO - 16 AGO 2020 - $3.000</p>
                                                <a href="#!" class="btn btn-primary">CONSULT</a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Card content --> */}
                                    <div class=" col-lg-4 col-md-6 mb-4">

                                        <div class="card ">
                                            <div class="card-header">
                                                <img class="rounded-circle z-depth-2" alt="100x100" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"
                                                    data-holder-rendered="true" />
                                            </div>
                                            <div class="card-body">
                                                <h5 class="card-title">LAURA HERNANDEZ</h5>
                                                <p class="card-text">MAESTRO - 16 AGO 2020 - $4.000</p>
                                                <a href="#!" class="btn btn-primary">CONSULT</a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Card content --> */}
                                    <div class=" col-lg-4 col-md-6 mb-4">

                                        <div class="card ">
                                            <div class="card-header">
                                                <img class="rounded-circle z-depth-2" alt="100x100" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(32).jpg"
                                                    data-holder-rendered="true" />
                                            </div>
                                            <div class="card-body">
                                                <h5 class="card-title">ALEJANDRO ALBA</h5>
                                                <p class="card-text">ESTUDIANTE - 15 AGO 2020 - $2.500</p>
                                                <a href="#!" class="btn btn-primary">CONSULT</a>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div class="card text-left">
                            <div class="card-header">
                                <b>Latest Feedbacks</b>
                            </div>
                            <div class="card-body">
                                <div class="row">

                                    {/* <!-- Card content --> */}
                                    <div class=" col-lg-4 col-md-6 mb-4">
                                        <div class="card">
                                            <div class="card-body">
                                            <img class="rounded-sm" alt="75x75" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(32).jpg"
                                                    data-holder-rendered="true" />
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div class=" col-lg-8 col-md-6 mb-4">
                                        <div class="card">
                                            <div class="card-body">
                                                <h5 class="card-title">ALEJANDRO: </h5>
                                                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                                <a href="#!" class="btn btn-primary">Comment</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}


export default DriverHome;