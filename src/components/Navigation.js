import React, { Component } from "react";

class Navigation extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark ">
                <a href="#" className="text-white">CADAN WHEELS - {this.props.title}</a>

                <div className="d-flex justify-content-end">
                    <a className="text-white p-2" href="#">Home <span className="sr-only">(current)</span></a>
                    <a className="text-white p-2" href="#">Profile <span className="sr-only">(current)</span></a>
                    <a className="text-white p-2" href="#">Add Car <span className="sr-only">(current)</span></a>
                    <a className="text-white p-2" href="#">Statistics <span className="sr-only">(current)</span></a>
                    <button className="btn btn-danger my-2 my-sm-0" type="submit">Logout</button>
                </div>

            </nav>
        );
    }
}

export default Navigation;