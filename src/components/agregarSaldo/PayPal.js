
import React, { useRef, useEffect } from "react";



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
                        toast.success('Has depositado $' + props.data.cantidad + ' USD en su cuenta');
                        props.data.aprobado = true
                        console.log(props);

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