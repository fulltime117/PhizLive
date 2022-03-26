import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import ServicerData from '../../data/servicersData.json';
import CloseIcon from '@material-ui/icons/Close';
import {Route} from 'react-router-dom';
import Calendar from './ui-component/calender'

let servicer_Id = 0;

class Skills extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        servicerData:ServicerData.servicers,
    };
    

  }
  componentDidMount(){
    console.log(this.props.s)
  }

  render() {
    if(this.props.location.servicer_id){
      servicer_Id = this.props.location.servicer_id
    }else{
      servicer_Id =0
    }

  
    const s_data =  this.state.servicerData[servicer_Id];
    
    const servecier_name = s_data.name;

    const servecier_face = s_data.face;

    const servecier_job = s_data.job;

    const servecier_review = s_data.review;

   

    let menuItems = [];

    for (var i = 0; i <s_data.star; i++) {
        menuItems.push( <StarIcon key={i} style={{fontSize:'29px'}} className="checkedStar"></StarIcon> );
    }

    for (var k = 0; k <5-s_data.star; k++) {
        menuItems.push( <StarIcon key={i+k} style={{fontSize:'29px'}}></StarIcon> );
    }
    return (
        <main>
            <div className="servicer-profile-container pos-re">
                  <Route render={({ history}) => ( 
                          <button className="size-reduce-btn appoint-close-btn" >
                          <CloseIcon className="arrow-back-icon" onClick={ () => {history.push('/dashboard/services')} }/>
                      </button>
                  )} />
                <div className="appoint-content">
                  <div className="appointment-top">
                    <div className="col-6">
                      <div className="servicer-profile-data">
                        <div className="d-flex" >
                          <div className='s-servicer-image'>
                            <img src={servecier_face} alt='' className="w-100"></img>
                          </div>
                          <div className="servicer-detail-datas">
                            <h1>{servecier_name}</h1>
                            <h3>{servecier_job}</h3>
                            <p>category: LANDSCAPE</p>
                            <div>{menuItems}&nbsp;&nbsp;<span>{servecier_review}&nbsp;reivews</span></div> 
                          </div>               
                      </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="servicer-note-wrapper">
                        <div className="servicer-note">
                          <h3>NOTES</h3>
                          <h5>Hello, I'm only accepting 5 appointments per day and I don't accept Sunday. Appointment day is not an actual day of work,its a negotiation, site visit and estimation of project.Feel free to choose your own comfortable time. Thanks!</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="appointment-bottom">
                    <div className="appointment-content-body">
                      <div>
                        <Calendar />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </main>
    );
  }
}

export default Skills;