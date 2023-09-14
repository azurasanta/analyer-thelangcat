/*
* etype in "error", "warning", etc
*/

import React from 'react'
import classnames from "classnames";

export const Error = (props) => {
    const {etype, message} = props
    const eClass = etype == "error" ? "bg-red-500" : etype == "warning" ? "bg-amber-500" : "bg-lightBlue-500"
    return (
    <>
        <div className={classnames("text-white px-4 py-4 border-0 rounded relative mb-4", {[eClass] : true})}>
            <span className="text-xl inline-block mr-5 align-middle">
                <i className="fas fa-bell"></i>
            </span>
            <span className="inline-block align-middle mr-8">
                <b className="capitalize"></b>
                {message} </span>
            {/* <button className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
                <span>×</span>
            </button> */}
        </div>
    </>)
}
