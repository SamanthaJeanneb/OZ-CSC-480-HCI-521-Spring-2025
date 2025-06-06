import React, { useContext, useState } from "react";
import {reportQuote} from "../lib/api.js";
import { AlertContext } from "../lib/Contexts.jsx";

const ReportModal = ({ showReportModal, onClose, user, quoteID }) => {
    const [reportReasons, setReportReasons] = useState([]);
    const [customReason, setCustomReason] = useState("");
    const [_, setAlert] = useContext(AlertContext);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        
        if (checked) {
            setReportReasons([...reportReasons, value]); // Add to selected reasons
        } else {
            setReportReasons(reportReasons.filter((reason) => reason !== value)); // Remove from selected reasons
        }
    };

    const submitQuoteReport = () => {
        const contextTypeValue = reportReasons.join(", ");

        const reportData = { 
        quote_id: quoteID, 
        context_type: contextTypeValue, 
        message: customReason };


        reportQuote(reportData)
            .then(() => {
                setAlert({ type: "success", message: "Your report was submitted successfully!"})
            })
            .catch((err) => {
                setAlert({ type: "danger", message: "Something went wrong submitting your report"})
            })
        onClose();
    }
    

    return showReportModal ? (
        <div onClick={(e) => e.stopPropagation()} className="modal show" style={{ display: "block", textAlign: "left" }}>
            <div className="modal-dialog modal-dialog-centered">

                <div className="modal-content" style={{ borderRadius: "10px", padding: "10px 25px 10px 25px" }}>
                    <div className="modal-header pl-0 pb-0" style={{ borderBottom: "none" }}>
                        <div style={{ textDecoration: "none" }}>
                            <h5 style={{ fontWeight: "1000" }} >Hi, {user.Username}!</h5>
                        </div>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <h5>Why are you reporting this quote?<br />(Check all that apply)</h5>

                    <div className="container mt-3" style={{ backgroundColor: "#FDF7CD", borderRadius: "10px", padding: "10px 25px 10px 25px", fontWeight: "500" }}>
                        <div className="row mt-2">
                            <div className="col-sm-1">
                                <input type="checkbox" className="custom-checkbox" name="reason" value="Hate speech/Harassment" onChange={handleCheckboxChange} />
                            </div>
                            <div className="col-sm-11">
                                <span>Hate speech/Harassment</span>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-sm-1">
                                <input type="checkbox" className="custom-checkbox" name="reason" value="Privacy Violation" onChange={handleCheckboxChange} />
                            </div>
                            <div className="col-sm-11">
                                <span>Privacy Violation</span>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-sm-1">
                                <input type="checkbox" className="custom-checkbox" name="reason" value="Intellectual Property Violation/False Information" onChange={handleCheckboxChange} />
                            </div>
                            <div className="col-sm-11">
                                <span>Intellectual Property Violation/False Information</span>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-sm-1">
                                <input type="checkbox" className="custom-checkbox" name="reason" value="Advertisement/Promotion of illegal activity or content" onChange={handleCheckboxChange} />
                            </div>
                            <div className="col-sm-11">
                                <span>Advertisement/Promotion of illegal activity or content</span>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-sm-1">
                                <input type="checkbox" className="custom-checkbox" name="reason" value="Impersonation" onChange={handleCheckboxChange} />
                            </div>
                            <div className="col-sm-11">
                                <span>Impersonation</span>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-sm-1">
                                <input type="checkbox" className="custom-checkbox" name="reason" value="Other" onChange={handleCheckboxChange} />
                            </div>
                            <div className="col-sm-2 pr-0">
                                <span>Other:</span> 
                            </div>
                            <div className="col-sm pl-0">
                                <input className="rounded-textbox" name="otherReasonText" type="text" placeholder="This is an example reason for reporting"
                                disabled={!reportReasons.includes("Other")} 
                                value={customReason}
                                onChange={(e) => setCustomReason(e.target.value)}/>
                            </div>
                        </div>

                    </div>
                    <div className="row mt-3">
                        <div className="col-sm">
                        {reportReasons !=0 && (
                            <button className="rounded-button-style" name="reportQuoteBtn" onClick={submitQuoteReport} 
                            style={{ margin: "auto", display: "block" }}>
                                Report Quote</button>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;

};

export default ReportModal;
