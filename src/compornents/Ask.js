import React,{useState,useContext} from 'react';
import { ApiContext } from '../context/ApiContext';
import Button from '@mui/material/Button';
import Modal from 'react-modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import {RiMailAddLine} from 'react-icons/ri';
import {IoIosSend} from 'react-icons/io';
import {IoMdClose} from 'react-icons/io';

const useStyles = makeStyles((theme) => ({
    button:{
        margin:theme.spacing(1),
    },
    text:{
        margin:theme.spacing(3),
    },
}))

const Ask = ({ask,prof}) => {
    const classes = useStyles()
    Modal.setAppElement('#root')
const {changeApprovalRequest,sendDMcont,sendDM} = useContext(ApiContext)
const [modalIsOpen,setModalIsOpen] = useState(false)
const [text,setText] = useState('')

const customStyles = {
    content : {
        top : '50%',
        left: '40%',
        right: 'auto',
        bottom: 'auto',
    }
}

const handleInputChange = () => event => {
        const value = event.target.value
        setText(value)
}

const sendDm = () =>{
    const uploadDM = new FormData()
    uploadDM.append("receiver",ask.askFrom)
    uploadDM.append("message",text)
    sendDMcont(uploadDM)
    setModalIsOpen(false)
}

const changeApproval = () => {
    const uploadDataAsk = new FormData()
    uploadDataAsk.append("askTo",ask.askTo)
    uploadDataAsk.append("approved",true)
    changeApprovalRequest(uploadDataAsk,ask)
}

  return (
    <li className='list-item'>
        <h4>{prof[0].nickname}</h4>
        {!ask.approved ?
            <Button size="small" className={classes.button} variant="contained" color="primary" onClick={()=>changeApprovalRequest()}>Approve</Button>:
            <button className='mail' onClick={()=>setModalIsOpen(true)}><RiMailAddLine/></button>
        }
        <Modal isOpen={modalIsOpen} onRequestClose={()=>setModalIsOpen(false)}style={customStyles}>
            <Typography>Message</Typography>
            <TextField className={classes.text} type="text" onChange={handleInputChange()}/>
            <br/>
            <button className="btn-modal" onClick={()=>sendDM()}><IoIosSend/></button>
            <button className="btn-modal" onClick={()=>setModalIsOpen(false)}><IoMdClose/></button>
        </Modal>
    </li>
  )
}

export default Ask