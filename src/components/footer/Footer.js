import StickyFooter from 'react-sticky-footer';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import "./Footer.css"

export default function Footer() {

    return (
        <StickyFooter
            
            
        >
             <footer id="footer" className="py-4 bg-dark text-white-50">
                    <div className="container text-center">
                        Copyright &copy; CADAN WHEELS
                    </div>
                </footer>
        </StickyFooter>
    );

}