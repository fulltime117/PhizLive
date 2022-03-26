import React, { forwardRef } from "react";
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import ImageUpload from './image-uplold'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import $ from "jquery"




const ModalContent = forwardRef((props, ref) => {

    const [values, setValues] = React.useState({
        numberformat: '',
        le:'',
        flag:true,
      });

    const [state, setstate] = React.useState([]);
    const [count, setCount] = React.useState(0)


      

      function callbackFunction(file) {               
        props.parentCallback(file); //send image data to creteRoom
      }

      const closeModal = () => {
        props.CloseModal()
        setstate([])
        setCount(0);
      };

      const closeSendModal = () =>{
        props.CloseSendModal('ok');
        setstate([])
        setCount(0);        
      } 

      

      function friendsSelect(){ 
        var len = $('.frr').length;
        console.log(len);
        setCount(len)
        $('.fr-se').removeClass('erro-fr-se');
        if(values.flag){         
          $(".select-arrow-icon").css("transform" , "rotate(180deg)")
        }else{
          $(".select-arrow-icon").css("transform" , "rotate(0deg)")
        }
          $(".hidden-item-list").slideToggle();
          setValues({newdata:!values.flag})         
      };

      function checkFriend(k){
        let arr = props.data;
        let fl = document.getElementsByClassName('square-check')[k].style.display === "block";
        let dis =(fl)?'none':'block';
        document.getElementsByClassName('square-check')[k].style.display=dis;        
        if(!fl){          
          let arr1 = arr[k];
          var arr2 = state.concat(arr1);
          setstate(arr2);          
        }else{
          var arr1 = [];
          arr1.push.apply(arr1,state);
          let ke = arr1.indexOf(arr[k]);
          arr1.splice(ke, 1);
          setstate(arr1);
        }        
      }

  return (
    <div className="modal-content-container" ref={ref}>
        <div className="upload-modal-title">
            <h3>CREATE ROOM</h3>
        </div>
        <div className="upload-modal-content row">
            <div className='col-4 nw-r'>
                <div className={(props.ImgUrl)?"multi-upload-feature justify-align-center pos-re borderactive p-0":"multi-upload-feature justify-align-center pos-re"}>
                    {
                      (props.ImgUrl)?
                        <React.Fragment>
                          <div className="uploaded-profile-img-wrapper">
                            <img src={props.ImgUrl} alt=""></img>
                          </div>
                        </React.Fragment>
                          :
                        <React.Fragment>
                          <div className="upload-icon"></div>
                          <h6>Upload Profile Photo</h6> 
                        </React.Fragment>
                    }
                    <div className={(props.ImgUrl)?'dn':"upload-image-preview pos-ab"}>
                        <ImageUpload parentCallback = {callbackFunction}/>
                    </div>
                </div>
                <div className={(count>3 )?"new-room-friends more-border":"new-room-friends"}>
                  { 
                    state.map((friend,k)=>{
                    return (
                        <div key={k} onClick={()=>checkFriend(k)} className="selected-roomfriend frr">
                            <div className="horizontal-center">    
                                <span className="u-profile">
                                    <img src={friend.face} width={"35px"} alt=""></img>
                                </span>
                                <span className="r-name mt-0" style={{fontSize:"14px", color:'#ff8300'}}>{friend.name}</span>
                            </div>
                        </div>
                      )
                    })
                  }  
                </div>                
            </div>
            <div className='col-8'>
                <form noValidate>     
                    <InputBase
                        id="pName"
                        className="product-add-input hover-height-fix"
                        placeholder="Room Name"
                        defaultValue=""
                        inputProps={{ 'aria-label': 'naked' }}
                    />
                    
                    <div className="pos-re custom-select justify-align-center create-room-select-user">                       
                        <span onClick={friendsSelect} className="fr-se-in-wrapper"><input type="text" className={(count<=0)?"select-friend-input":'select-friend-input fr-se'} disabled placeholder={(count > 0)?count+ " friens selected":"Add members"}></input></span>
                        <ExpandMoreIcon className="select-arrow-icon" style={{right:'20px'}}/>
                        <ul className="hidden-item-list create-room-firends" style={{width:'77%', top:'52.5px',maxHeight:'28vh', overflow:'auto', zIndex:'5'}}>
                        { 
                            props.data.map((friend,k)=>{
                            return (
                                <li key={k} onClick={()=>checkFriend(k)}>
                                    <div className="horizontal-center">  
                                        <div className="square-check">
                                          <img src={'../../assets/icons/square-check.svg'} alt=""></img>
                                        </div>                                      
                                        <span className="u-profile">
                                            <img src={friend.face} width={"35px"} alt=""></img>
                                        </span>
                                        <span className="r-name mt-0" style={{fontSize:"14px"}}>{friend.name}</span>
                                    </div>
                                </li> 
                                )
                            })
                        } 
                        </ul>
                    </div>

                    <TextField
                        style={{height:'228px'}}
                        placeholder="Room Description..."
                        className="product-add-input"
                        id="outlined-multiline-static"
                        multiline
                        rows={12}
                        defaultValue=""
                        variant="outlined"
                    />
                </form>
            </div>
        </div>
        <div className="product-add-modal-footer">
            <Button className={(props.ImgUrl)?"g-back bunHover":"g-back bunHover none-click"}  onClick={closeSendModal} >Ok</Button>
            <Button className="t-back bugHover" onClick={closeModal} >Cancel</Button>
        </div>
    </div>
  );
});

export default ModalContent;
