import React from "react";
import Swiper from "react-id-swiper";
import { compose, pure, withProps, withHandlers } from "recompose";


const SwiperApp = ({
  data,
  params,
  renderDomComponent
}) => (
  <div className="container swiper-window">
    <Swiper {...params}>{data.map(renderDomComponent)}</Swiper>
  </div>
);

export default compose(
  withProps(() => {
    const params = {
      loop: true,
      centeredSlides: true,
      slidesPerView: 1,
      grabCursor: true,
      loopAdditionalSlides: 1,
      watchSlidesVisibility: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      spaceBetween:10,
    };

    let data = [
      {        
        url: "../../assets/serviceImg/service1.webp",         
      },
      {        
        url: "../../assets/serviceImg/service2.webp", 
      },
      {       
        url: "../../assets/serviceImg/service3.webp", 
      },
      {        
        url: "../../assets/serviceImg/service4.webp", 
      }      
    ];
    
    return {
      params,
      data
    };
  }),
  withHandlers({
    handleClick: () => link => () => {
      console.log(link);

    },
    routeChange: () => {
      alert();
      // let path = `/instant-room`;
      // this.props.history.push(path);
   }
  }),
  withHandlers({    
    renderDomComponent: ({ handleClick }) => (item, index) => (
      <div key={item.url} className="game-sliders">
          <div className="g-swiper-card pos-re">
              <img src={item.url} alt="d" className="pos-ab"></img>
          </div> 
      </div>
    )
  }),
  pure
)(SwiperApp);
