import React, { Component } from 'react'
import { Bounce } from "gsap";
import ServiceSwiper from './ui-component/serviceSwiper'
import { TweenLite, TimelineLite } from 'gsap';
import Button from '@material-ui/core/Button';
import Servicers from '../../data/servicersData.json'
import StarIcon from '@material-ui/icons/Star';
import {Route} from 'react-router-dom';




export class container extends Component {
    constructor(props) {
        super(props);
        // reference to the DOM node
        this.myElement = null;
        // reference to the animation
        this.myTween = null;
        this.tl = null;
        this.disposer = null;
        this.state = {
            servicers:Servicers.servicers,
            serviceList:Servicers.category,
         }
        this.GotoProfile = this.GotoProfile.bind(this)
      }
    
      componentDidMount() {
        // console.log(this.props.leftSideState)
        setTimeout(() => {
          this.start();
        }, 1000);
        
      }
    
      restart = () => {
        this.tl.restart();
      };
    
      start = () => {
        this.tl = new TimelineLite();
        TweenLite.set(this.gsapen, { visibility: 'visible' });
        this.tl.from(this.coso2, 1, { x: 600, opacity: 0, ease: Bounce.easeOut }, 0.1);
        this.tl.staggerFrom('.service-item', 0.5, { x: 20, opacity: 0 }, 0.1);
      };

      GotoProfile(index){
          console.log(index);
          this.props.showProfile(index);
      }

    render() {
        return (
            <div className="row m-0">                
                <div className="col-9">
                    <div className="service-container">
                        <div className="gsapen" ref={div => (this.gsapen = div)}>
                            <div className='service-items-header'>
                                <h3 className='ml-1 service-item-title' ref={h3 => (this.coso2 = h3)}>HANDYMAN SERVICES</h3> 
                            </div>
                            <div className="service-items">
                                <div className="service-item">
                                    <div className="service-icon-wrapper">
                                        <div className="service-icon carprntry"></div>
                                    </div>
                                    <div>
                                        <h6>Carpentry</h6>
                                    </div>
                                </div>
                                <div className="service-item">
                                    <div className="service-icon-wrapper">
                                        <div className="service-icon repair"></div>
                                    </div>
                                    <h6>Appliance Repair</h6>
                                </div>
                                <div className="service-item">
                                    <div className="service-icon-wrapper">
                                        <div className="service-icon cleaning"></div>
                                    </div>
                                    <h6>Cleaning&amp;Maid Services</h6>
                                </div>
                                <div className="service-item">
                                    <div className="service-icon-wrapper">
                                        <div className="service-icon plumb"></div>
                                    </div>
                                    <h6>Plumbing</h6>
                                </div>
                                <div className="service-item">
                                    <div className="service-icon-wrapper">
                                        <div className="service-icon electrical"></div>
                                    </div>
                                    <h6>Electrical</h6>
                                </div>
                                <div className="service-item">
                                    <div className="service-icon-wrapper">
                                        <div className="service-icon painting"></div>
                                    </div>
                                    <h6>Painting</h6>
                                </div>
                                <div className="service-item">
                                    <div className="service-icon-wrapper">
                                        <div className="service-icon ston"></div>
                                    </div>
                                    <h6>Concrete, Bricks&amp;Stone</h6>
                                </div>
                                <div className="service-item">
                                    <div className="service-icon-wrapper">
                                        <div className="service-icon landscapeIcon"></div>
                                    </div>
                                    <h6>Landscape</h6>
                                </div>
                                <div className="service-item">
                                    <div className="service-icon-wrapper">
                                        <div className="service-icon otherIcon"></div>
                                    </div>
                                    <h6>Others</h6>
                                </div>
                            </div>
                        </div>
                        <div className="visivki">
                            <div className={this.props.s===true?"service-swiper left-side-active-service":'service-swiper'}>
                                <ServiceSwiper />
                            </div>
                            <h2 style={{textAlign:'center', color:'#ff8300', marginBottom:'25px'}}>BROWSE SERVICE PROVIDER IN YOUR LOCALITY</h2>
                            <div className="servicers-wrapper mb-3">
                                { 
                                    this.state.servicers.map((servicer,j)=>{
                                        
                                        let menuItems = [];

                                        for (var i = 0; i <servicer["star"]; i++) {
                                            menuItems.push( <StarIcon key={i} style={{fontSize:'18px'}} className="checkedStar"></StarIcon> );
                                        }

                                        for (var k = 0; k <5-servicer["star"]; k++) {
                                            menuItems.push( <StarIcon key={i+k} style={{fontSize:'18px'}}></StarIcon> );
                                        }
                                        
                                        return (
                                            <div className="servicer-card row m-0" key={j}>
                                                <div className="servicer-Img col-5" style={{paddingTop:"17px"}}> 
                                                    <div className="t-g-card-img-wrapper" style={{width:'190px', height:'190px'}}>
                                                        <img src={servicer.face} alt=''></img>
                                                    </div>
                                                </div>
                                                <div className="servicer-data col-7 p-0 pt-3">
                                                    <div className="pl-0 service-card-data justify-align-center">
                                                        <h2 className="m-0 mb-1">{servicer.name}</h2>
                                                        <h5 className="m-0 mb-1">{servicer.job}</h5> 
                                                        <p className="mb-0">posted by: Davey Jones</p>                                           
                                                        <div className="t-g-review-wrapper">                                                
                                                            {menuItems}
                                                            <span>{servicer.review} Reviews</span>
                                                        </div>
                                                    </div>
                                                    <div className="g-button-wrraper favority-buy-btns pr-4 pt-4">
                                                        <Route render={({ history}) => ( 
                                                            <Button className="g-card-play-btn g-back bunHover"
                                                                onClick={
                                                                          () => {
                                                                            history.push({
                                                                                pathname : '/dashboard/services/about',
                                                                                servicer_id : j 
                                                                            }); 
                                                                           }
                                                                        }>
                                                                Profile
                                                            </Button>
                                                        )} />
                                                        <Route render={({ history}) => ( 
                                                            <Button className="g-card-play-btn g-back bunHover"
                                                                onClick={ () => {
                                                                    history.push({
                                                                        pathname : '/dashboard/services/skills',
                                                                        servicer_id : j
                                                                    });
                                                                } 
                                                            }>Hire Me</Button>
                                                        )} />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3 pr-5 mt-5 coso3">
                    <div className="service-side-top mb-4">
                        <h1>Join Phiz Services</h1>
                        <Button className="g-back bunHover mt-2">Become a Service Provider</Button>
                    </div>
                    <div className="service-side-bottom pb-4">
                        <div className="g-side-header g-back" style={{height:'80px'}}>
                            <h4>Most Search Services</h4>
                        </div>
                        <div className="g-side-list" style={{height:'100%'}}>
                            <ul className="g-side-list-wrapper">
                                { 
                                    this.state.serviceList.map((sevicelist,j)=>{
                                    return (
                                        <li className="g-side-item" style={{color:'white'}} key={j}>{sevicelist}</li>
                                    )
                                    })
                                }
                            </ul>
                        </div>
                    </div>         
                </div>
            </div>
            
        )
    }
}

export default container
