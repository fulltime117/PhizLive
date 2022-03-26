import React from 'react';
import Button from '@material-ui/core/Button';
import $ from "jquery"
import StarIcon from '@material-ui/icons/Star';
import ServicerData from '../../data/servicersData.json';
import CloseIcon from '@material-ui/icons/Close';
import {Route} from 'react-router-dom';



let servicer_Id = 0;

class About extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        servicerData:ServicerData.servicers,
        gallery:ServicerData.servicers[0].gallary[0],
    };
    this.reviewHandler = this.reviewHandler.bind(this);

  }
 componentDidMount(){
   if(this.props.location.servicer_id){
    this.setState({gallery:ServicerData.servicers[this.props.location.servicer_id].gallary[0],})
   }
   
  //  console.log(this.props.location.servicer_id); 
  //  console.log(this.state.servicerData[this.props.location.servicer_id])     
 }

 handerGallary = (e) =>{        
  let elmImg = e.target.src
  let elmId = e.target.id
 
  $('.ga-img').addClass('ga-img-animation')
  $('.thumImg').removeClass('thumImg-active')
  $("#"+elmId).addClass('thumImg-active')
  setTimeout(
      function() {
          this.setState({gallery: elmImg})
          $('.ga-img').removeClass('ga-img-animation')
      }
      .bind(this),
      100
  );  
}

reviewHandler(r){
  let starId = r.target.id
  $("#"+starId).toggleClass('new-review-star-checked')
}



  render() {
    
      if(this.props.location.servicer_id){
        servicer_Id = this.props.location.servicer_id
      }else{
        servicer_Id =0
      }

    
      const s_data =  this.state.servicerData[servicer_Id];

      const servecier_id = servicer_Id;
      
      const servecier_name = s_data.name;

      const servecier_face = s_data.face;

      const servecier_job = s_data.job;

      const servecier_review = s_data.review;

      const gallary = s_data.gallary;

      const banner = s_data.banner;

      let menuItems = [];

      for (var i = 0; i <s_data.star; i++) {
          menuItems.push( <StarIcon key={i} style={{fontSize:'18px'}} className="checkedStar"></StarIcon> );
      }

      for (var k = 0; k <5-s_data.star; k++) {
          menuItems.push( <StarIcon key={i+k} style={{fontSize:'18px'}}></StarIcon> );
      }
    
    return (
        <main>
            <div className="servicer-profile-container">
                <div className="s-banner-info pos-re">
                  <div className='s-banner-img-wrapper'>
                      <img src={banner} style={{width:'100%'}} alt=""></img>
                      <Route render={({ history}) => ( 
                          <button className="size-reduce-btn service-close-btn" >
                              <CloseIcon className="arrow-back-icon" onClick={ () => {history.push('/dashboard/services')} }/>
                          </button>
                      )} />
                  </div>
                  <div className="justifyCenter">
                    <div className="s-servicer-detail">
                      <div className='s-servicer-image'>
                        <img src={servecier_face} alt='' className="w-100"></img>
                      </div>
                      <h1>{servecier_name}</h1>
                      <h3>{servecier_job}</h3>
                      <p>category: LANDSCAPE</p>
                      <div>{menuItems}<span>{servecier_review}&nbsp;reivews</span></div>
                      <div className="g-button-wrraper servicer-btns">
                        <Route render={({ history}) => ( 
                            <Button className="g-card-play-btn g-back bunHover"
                                onClick={ () => {
                                    history.push({
                                        pathname : '/dashboard/services/skills',
                                        servicer_id : servecier_id,
                                    });
                                } 
                            }>Hire Me</Button>
                        )} />
                        <Button className='g-card-play-btn g-back bunHover'>Message Me</Button>
                      </div>
                    </div>
                  </div>
                  <div className="s-service-gallary">
                    <div className="precontent-row">
                      <h2 className="s-service-subtitle">BROWSE PORTFOLIO</h2>
                      <div className="precontent-gallay">
                          <img src={this.state.gallery} className="ga-img" alt=""></img>
                      </div>
                      <div className="precontent-thumbnails">
                          {
                            gallary.map((ga,i)=>{
                                return(
                                  <div className="precontent-thumbnailImage" key={i} >
                                      <img src={ga} className={(i===0)?'thumImg thumImg-active':"thumImg"} id={"tu"+i} alt="" onClick={this.handerGallary} ></img>
                                  </div>
                                )
                            })
                          } 
                      </div>
                    </div>

                    <div className="precontent-row extra-service mt-5 pt-4">
                      <div className="comment-review-title mb-4">
                          <h3>OTHER SERVICES OFFERED</h3>
                      </div>
                      <div className="extra-service-item justifyCenter">
                        <div className="horizontal-center mr-5">
                          <div className="extra-service-icon-wrapper justify-align-center">
                              <div className="service-icon consultations"></div>
                          </div> 
                          <h4>Consultation</h4>
                        </div>
                        <div className="horizontal-center ml-5">
                          <div className="extra-service-icon-wrapper justify-align-center">
                              <div className="service-icon interior"></div>
                          </div>                         
                          <h4>Interior Design</h4>
                        </div>                          
                      </div>
                    </div>

                    <div className="precontent-row mt-5">
                      <div className="comment-review-title">
                          <h3>COMMENTS & REVIEWS</h3>
                      </div>
                        {
                            s_data.customerReview.name.map((srd,ij)=>{
                                return(
                                    <div className="comment-review-content" key={ij}>
                                        <div className="review-owner-img">
                                            <img src={s_data.customerReview.face[ij]} alt="" style={{width:"54px", height:'54px', borderRadius:'100px'}}></img>
                                        </div>  
                                        <div className="user-review-wrapper" style={{borderBottom:'2px solid #4E5165'}}>
                                            <h6 style={{color:'#707070',width:'50%',display:'flex', justifyContent:'space-between'}}>{s_data.customerReview.name[ij]}<span style={{fontSize:'13px'}}>{s_data.customerReview.giveTime[ij]}</span></h6>
                                            <div className="t-g-review-wrapper">
                                                <StarIcon style={{fontSize:'24px'}} className="checkedStar"></StarIcon>
                                                <StarIcon style={{fontSize:'24px'}} className="checkedStar"></StarIcon>
                                                <StarIcon style={{fontSize:'24px'}} className="checkedStar"></StarIcon>
                                                <StarIcon style={{fontSize:'24px'}} className="checkedStar"></StarIcon>
                                                <StarIcon style={{fontSize:'24px'}} className="checkedStar"></StarIcon>
                                            </div>
                                            <p style={{marginTop:'20px', marginBottom:'20px'}}>{s_data.customerReview.giveText[ij]}</p>
                                            <div className="g-item-header pos-re mb-2">
                                                <h4 style={{background:'#2c2f44'}}>
                                                    <div className="padding-arrond" style={{fontSize:'12px', color:'#666A85'}}><span role="img" aria-label="Snowman">&#10084;</span> {s_data.customerReview.reviewNumber}</div>
                                                    <div className="padding-arrond" style={{fontSize:'12px', color:'#666A85'}}><span role="img" aria-label="Snowman">&#x1F919;</span> {s_data.customerReview.reviewNumber}</div>
                                                    <div className="padding-arrond" style={{fontSize:'12px', color:'#666A85'}}>Reply</div>
                                                </h4>
                                                <div className="col-12 p-0 pos-ab" style={{bottom:"53%"}}>
                                                    <div className="middle-line"></div>
                                                </div>
                                            </div>
                                            <div className="other-user-review">
                                                <div className="review-owner-img">
                                                    <img src={servecier_face} alt="" style={{width:"54px", height:'54px', borderRadius:'100px'}}></img>
                                                </div> 
                                                <div className="user-review-wrapper">
                                                    <h6 style={{color:'#707070', width:'90%',display:'flex', justifyContent:'space-between'}}>{servecier_name}<span style={{fontSize:'13px'}}>{s_data.customerReview.replyTime[ij]}</span></h6>
                                                    <p style={{marginTop:'10px', marginBottom:'10px'}}>{s_data.customerReview.replyText[ij]}</p>
                                                    <div>
                                                        <div className="padding-arrond" style={{fontSize:'12px', color:'#666A85'}}><span role="img" aria-label="Snowman">&#10084;</span> {s_data.customerReview.reviewNumber}</div>
                                                        <div className="padding-arrond" style={{fontSize:'12px', color:'#666A85'}}><span role="img" aria-label="Snowman">&#x1F919;</span> {s_data.customerReview.reviewNumber}</div>
                                                        <div className="padding-arrond" style={{fontSize:'12px', color:'#666A85'}}>Reply</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                      
                                    </div>
                                )
                            })
                        }

                        <div className="new-review-star-wrapper">
                            <div className='new-review-star-icon' id="star1" onClick={this.reviewHandler}></div>
                            <div className='new-review-star-icon' id="star2" onClick={this.reviewHandler}></div>
                            <div className='new-review-star-icon' id="star3" onClick={this.reviewHandler}></div>
                            <div className='new-review-star-icon' id="star4" onClick={this.reviewHandler}></div>
                            <div className='new-review-star-icon' id="star5" onClick={this.reviewHandler}></div>
                        </div>

                        <div className="send-new-review">
                            <textarea id="message" placeholder="Send a feedback..." required="" minLength="1" maxLength="1500" style={{background:'#262839'}}/>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </main>
    );
  }
}

export default About;