import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { Button } from "@material-ui/core";


const Modal = props => {
  let modalVeil = null;
  let modalDialog = null;
  let modalContent = null;

  const [modalTween] = useState(gsap.timeline({ paused: true }));
  
  const [state, setState] = React.useState({
    fileUrl: ''
  });
  

  useEffect(()=>{
    setState({
      fileUrl:props.dataFromParent,
    });
  },[props.dataFromParent]);

  useEffect(() => {
    modalTween
      .to(modalVeil, 0.25, { autoAlpha: 1 })
      .to(modalDialog, 0.35, { y: 0, autoAlpha: 1 })
      .from(
        modalContent.children,
        0.35,
        { y: 15, opacity: 0, stagger: 0.1 },
        "-=0.15"
      )
      .reverse();
  }, []);

  useEffect(() => {
    modalTween.reversed(!props.visible);
  }, [props.visible]);

  const closeModal = () => {
    modalTween.reverse();
    gsap.delayedCall(modalTween.duration(), props.close);
    props.ImgUrl(state.fileUrl);
  };

   const CancelcloseModal = () => {
    modalTween.reverse();
    gsap.delayedCall(modalTween.duration(), props.close);
    props.ImgUrl('');
  };

  return (
   
    <div className="shop-modal">
      <div className={`preview-container modal-container${props.visible ? " show" : ""}`}>
        <div
          className="modal-img-preview"
          ref={e => (modalVeil = e)}          
        />
        <div className="modal-dialog uploaded-image-window"  ref={e => (modalDialog = e)}>
          <div ref={e => (modalContent = e)} className="uploaded-image-wrapper" style={{height:'400px'}}>
              <h3>
                Profile Picture 
              </h3>
              <div className="form-group multi-preview">                
                    <div className="pos-re preview-uploaded-image pos-re" > 
                        <div className="Led-effect"></div>                    
                        <img src={state.fileUrl} alt="..." />                     
                    </div>
              </div>
          </div>
          <div className="product-add-modal-footer">
            <Button className="g-back bunHover" onClick={closeModal} >Ok</Button>
            <Button className="t-back bugHover" onClick={CancelcloseModal} >Cancel</Button>
        </div>
        </div>
      </div>
    </div>
    
  );
};

export default Modal;
