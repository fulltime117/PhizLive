import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "../../css/room.css";
import {Card} from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import roomData from '../../data/addedroom.json';
import "../../css/addroom.css"
import CreateRoom from './createRoom';
import ImgPreview from './upload-Img-preview'
import frindsData from '../../data/friendData.json'
import Animate from 'animate.css-react'
import 'animate.css/animate.css'

export class index extends Component {

    constructor(props){
        super(props);
        this.state={
            roomdata:roomData,  
            isImagePreviewModalVisible:false,
            file:'',
            ImgUrl:'',
            friends:frindsData,
        };
    }

    componentDidMount(){
        this.props.handleLinkActive('roomState');
    }

    callbackFunction = (fileUrl) =>{
        if(fileUrl){
            console.log(fileUrl);
            this.setState({file:fileUrl})           
            this.setState({isImagePreviewModalVisible:true})
            this.setState({isCreateModalVisible:false})         }
    }

    showModal = () => {
        this.setState({isCreateModalVisible:true})        
    }; 

    closeModal = () => {
        this.setState({isCreateModalVisible:false})
        const arr = '';
        this.setState({file:arr},()=>console.log(this.state.file))
        this.setState({ImgUrl:''})
    };

    closeImgModal = () => {
        this.setState({isImagePreviewModalVisible:false})
        this.setState({isCreateModalVisible:true}) 
        
    };

    ImgUrl = (url) =>{
        console.log(url);
        this.setState({ImgUrl:url});        
    }

    render() {
       
        return (
            <div className="page-content room-content row">                
                <div className="top-page-header col-12">                    
                    <Card className="top-card-body">
                        <Card.Title className="mb-0">Room</Card.Title>
                        <div className="search-box">
                            <div className="searchIcon">
                            <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </Card>
                </div>  
                <div className="add-room-page-header justify-align-center w-100 mb-5 animate__animated animate__bounceInDown">
                    <h1 style={{color:'#ff8300'}}>CREATE ROOM FOR DIFFERENT PURPOSES</h1>
                </div>              
                <div className="room-array-section row">                        
                    <div className="col-9 justifyCenter">                            
                        <div className="added-room-sort">
                            {
                                this.state.roomdata.map((room,id)=>{
                                    return(
                                    <Card className="room-card small-card mb-0 resize-wh animate__animated animate__fadeInUpBig" key={id}>
                                        <div className="img-body">
                                            <Card.Img variant="top" src={room.roomImage} />                           
                                        </div>
                                        <Card.Body>
                                            <Card.Title className="mb-2">{room.roomName}</Card.Title>
                                            <Card.Text> {room.roonDescription} </Card.Text>
                                        </Card.Body>               
                                    </Card>
                                    )
                                })    
                            } 
                        </div> 
                    </div>
                    <div className="col-3">
                            <div className="animate__animated animate__fadeInLeft">
                                <Card className="room-card small-card resize-wh mb-0 room-plus-card" onClick={this.showModal}>
                                    <div className="add-plus-circle">
                                        <div className="room-plus-icon"></div>
                                    </div>
                                </Card>
                            </div>
                            <CreateRoom visible={this.state.isCreateModalVisible} ImgUrl={this.state.ImgUrl} data={this.state.friends} close={this.closeModal} parentCallback={this.callbackFunction} />
                            <ImgPreview visible={this.state.isImagePreviewModalVisible} close={this.closeImgModal} dataFromParent = {this.state.file} ImgUrl = {this.ImgUrl}/>                            
                        
                    </div>  
                </div>
                <div className="add-room-page-footer justify-align-center w-100 animate__animated animate__fadeInRight">
                    <h4 className="ani-jello-text animate__animated animate__jello" style={{color:'#4E5165'}}>As Gold Member you can create up to 10 rooms</h4>
                </div>

            </div>

        )   
    }
}

export default index
