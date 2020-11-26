
import React, { useRef, useEffect } from "react";

// config
import { API_ROOT } from '../../config/api-config';

// peticiones con AXIOS
import axios from 'axios';


// notificaciones
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';



export default function Paypal(props) {


    console.log("cantidad: ");
    console.log(props.data);


    const paypal = useRef();

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Cool looking table",
                                amount: {
                                    currency_code: "USD",
                                    value: props.data.cantidad,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order);
                    console.log(order.status);
                    console.log(order.status == "COMPLETED");
                    if (order.status == "COMPLETED") {

                        props.data.aprobado = true
                        console.log(props);

                        let usuario;

                        // obtener datos usuario
                        axios.get(API_ROOT + `/usuarios/` + sessionStorage.getItem("usuario"))
                            .then(res => {
                                let us = res.data;
                                console.log("data");
                                console.log(us);

                                if (us) {
                                    // actualizar saldo
                                    console.log("saldo");
                                    console.log(us.saldo);
                                    console.log(props.data.cantidad);
                                    us.saldo = parseInt(us.saldo) + parseInt(props.data.cantidad);
                                    axios.put(API_ROOT + `/usuarios/`, { 1: us })
                                        .then(res => {
                                            console.log(res.data);
                                            if (res.data) {
                                                toast.success('Usuario Actualizado!');
                                                toast.success('Has depositado $' + props.data.cantidad + ' USD en su cuenta');
                                                
                                            } else {
                                                toast.error("Error, no se puedo añadir saldo")
                                            }

                                        })
                                        .catch((err) => {
                                            console.log(err)
                                            toast.error("Error, no se puedo añadir saldo")
                                        })
                                }
                            })
                            .catch((err) => {
                                console.log(err)
                                toast.error("Error en el servidor.")
                            })

                    } else {
                        toast.error('Ha ocurrido un error al pagar')
                    }

                },
                onError: (err) => {
                    console.log(err);
                    toast.error('Ha ocurrido un error')
                },
            })
            .render(paypal.current);
    }, []);

    return (
        <div>

            <div ref={paypal}></div>
            {/* <button className="btn btn-success btnspace" onClick={() => toast.success('Success Message')}> Success Message</button>
            <button className="btn btn-info btnspace" onClick={() => toast.info('Info Message')}>Info Message</button>
            <button className="btn btn-danger btnspace" onClick={() => toast.error('Error Message')}>Error Message</button>
            <button className="btn btn-warning btnspace" onClick={() => toast.warning('Success Message')}>Warning Message</button> */}
            <ToastContainer />
        </div>
    );
}