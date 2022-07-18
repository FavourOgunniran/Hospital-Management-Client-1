import React, { useState } from 'react';
import { useFormik } from 'formik'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DeathRecords(props) {
    const [error, setError] = useState('')
    const patientTray = useSelector(state=>state.PatientReducer.patientTray)
    const deathTray = useSelector(state=>state.RecordsReducer.deathRecords)
    const [patientName, setPatientName] = useState('')
    const formik = useFormik({
        initialValues: {
            healthId: '',
            patientName: '',
            deathDate: '',
            guardianName: '',
            report: ''
        },
        onSubmit: (values)=>{
            console.log(values)
        }
    })
    const getPatientName = (healthId)=>{}
    return (
        <>
             <div className='container-fluid p-3'>
                <div className='row'>
                    <div className='col-12 bg-white border'>
                        <div className='d-flex justify-content-between border-bottom py-2'>
                            <p className='h6'>Death Records</p>
                            <button className='btn btn-primary' data-target='#birthModal' data-toggle='modal'><FontAwesomeIcon icon='plus' /> Add Death Record</button>
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-8 my-2'>
                            <input className='form-control' placeholder='Search...' />
                        </div>
                        {
                            deathTray.length === 0
                            ?
                            (
                                <div>
                                    <p className='font-weight-bold py-2'>No records yet</p>
                                </div>
                            )
                            :
                            (
                                <table className='table table-light table-striped table-responsive'>
                                    <thead>
                                        <tr>
                                            <th>Records Id</th>
                                            <th>Patient Name</th>
                                            <th>Gender</th>
                                            <th>Death Date</th>
                                            <th>Guardian Name</th>
                                            <th>Report</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            deathTray.map((item, index)=>(
                                                <tr>
                                                    <td> {item.recordsId} </td>
                                                    <td> {item.patientName} </td>
                                                    <td> {item.gender} </td>
                                                    <td> {item.deathDate} </td>
                                                    <td> {item.guardianName} </td>
                                                    <td> {item.report} </td>
                                                </tr>
                                            ))                                            
                                        }
                                    </tbody>
                                </table>
                            )
                        }
                    </div>
                </div>

                {/* Add Death Record Modal */}
                <div className='modal fade' id='birthModal' data-backdrop='static'>
                    <div className='modal-dialog modal-lg'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <p className='h6'>Add Death Record</p>
                                <button className='close text-primary' data-dismiss='modal' onClick={()=>{setError('')}}>&times;</button>
                            </div>
                            <div className='modal-body'>
                                <form className='p-3' onSubmit={formik.handleSubmit}>
                                    {
                                        error !== ''
                                        &&
                                        <div className='alert alert-danger'>
                                            <FontAwesomeIcon icon='triangle-exclamation'/> <b>{error}</b>
                                        </div>
                                    }
                                    <div className='form-row'>
                                        <div className='form-group col-sm-4'>
                                            <label>Health Id</label>
                                            <input name='' className='form-control' onChange={(e)=>getPatientName(e.target.value)} />
                                        </div>
                                        <div className='form-group col-sm-4'>
                                            <label>Patient Name's</label>
                                            <input name='motherName' onChange={formik.handleChange} value={patientName} className='form-control' style={{color: patientName === 'Record not found...' ? '#ff0000' : ''}} disabled />
                                        </div>
                                        <div className='form-group col-sm-4'>
                                            <label>Death Date</label>
                                            <input type='date' name='birthDate' className='form-control' onChange={formik.handleChange} max={new Date().toISOString().split('T')[0]} />
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                    <div className='form-group col-sm-4'>
                                            <label>Guardian's Name</label>
                                            <input name='guardianName' className='form-control' onChange={formik.handleChange} />
                                        </div>
                                        <div className='form-group col-sm-8'>
                                            <label>Report</label>
                                            <input type='text' name='report' className='form-control' onChange={formik.handleChange} />
                                        </div>
                                    </div>
                                    <button type='submit' className='btn btn-primary btn-block font-weight-bold'>Save Records</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeathRecords;