import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MyCalendar from 'react-big-calendar';
import CustomToolbar from './toolbar';
import Popup from 'react-popup';
import moment from 'moment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../../../actions';


// Setup the localizer by providing the moment (or globalize) Object to the correct localizer.
const localizer = MyCalendar.momentLocalizer(moment); // or globalizeLocalizer

class Calendar extends Component {

    componentDidMount() {
        this.props.fetchEvents();
    }

    //RENDER SINGLE EVENT POPUP CONTENT
    renderEventContent(slotInfo) {
        const date = moment(slotInfo.start).format('MMMM D, YYYY');
        return (
            <div className="appoint-preview">
                <h3>Date : <span>{date}</span></h3>
                <h3>Time : <span>{slotInfo.title}</span></h3>
            </div>
        );
    }
    
    //ON SELECT EVENT HANDLER FUNCTION
    onSelectEventHandler = (slotInfo) => {
        console.log(slotInfo);
        Popup.create({
            title: "Appointment",
            content: this.renderEventContent(slotInfo),
            buttons: {
                right: [{
                    text: 'Edit',
                    className: 'info',
                    action: function () {
                        Popup.close(); //CLOSE PREVIOUS POPUP
                        this.openPopupForm(slotInfo); //OPEN NEW EDIT POPUP
                    }.bind(this)
                }, {
                    text: 'Delete',
                    className: 'danger',
                    action: function () {
                        //CALL EVENT DELETE ACTION
                        this.props.deleteEvent(slotInfo.id);
                        Popup.close();
                    }.bind(this)
                }]
            }
        });
    }


    //HANDLE FUNCITON ON SELECT EVENT SLOT
    onSelectEventSlotHandler = (slotInfo) => {
        this.openPopupForm(slotInfo); //OPEN POPUP FOR CREATE/EDIT EVENT
        console.log(slotInfo);
    }

    //POPUP-FORM FUNCTION FOR CREATE AND EDIT EVENT
    openPopupForm = (slotInfo) => {
        let newEvent = false;
        let popupTitle = "Update Setting";
        if(!slotInfo.hasOwnProperty('id')) {
            slotInfo.id = moment().format('x');  //Generate id with Unix Millisecond Timestamp
            slotInfo.location = null;
            popupTitle = "Appointment Setting";
            newEvent = true;
        }


        let titleChange = function (e) {
            slotInfo.title = e.target.value;
        };


        const date = moment(slotInfo.start).format('MMMM D, YYYY');
        
        Popup.create({
            title: popupTitle,
            content: <div className="appointment-popup-content">
                        <h5 className="appointment-date">Date:&nbsp;<span><strong>{date}</strong></span></h5>
                        <FormControl>
                            <InputLabel htmlFor="grouped-select">Time</InputLabel>
                            <Select id="grouped-select" onChange={titleChange} defaultValue={slotInfo.title}>
                                <ListSubheader>Morning (am)</ListSubheader>
                                <MenuItem value={"9:00 am - 10:00 am"}>9:00 am - 10:00 am</MenuItem>
                                <MenuItem value={"11:00 am - 12:00 am"}>11:00 am - 12:00 am</MenuItem>
                                <ListSubheader>Afternoon (pm)</ListSubheader>
                                <MenuItem value={'1:00 pm - 2:00 pm'}>1:00 pm - 2:00 pm</MenuItem>
                                <MenuItem value={'3:00 pm - 4:00 pm'}>3:00 pm - 4:00 pm</MenuItem>
                                <MenuItem value={'5:00 pm - 6:00 pm'}>51:00 pm - 6:00 pm</MenuItem>                                
                            </Select>
                        </FormControl> 
                    </div>,
            buttons: {
                right: ['cancel'],
                left: [{
                    text: 'Ok',
                    className: 'success',
                    action: function () {
                        //CHECK THE ID PROPERTY FOR CREATE/UPDATE
                        if(newEvent) {
                            this.props.createEvent(slotInfo); //EVENT CREATE ACTION
                        
                        } else {
                            this.props.updateEvent(slotInfo); //EVENT UPDATE ACTION
                        }
                        Popup.close();
                    }.bind(this)
                }]
            }
        });
    }

    //EVENT STYLE GETTER FOR SLYLING AN EVENT ITEM
    eventStyleGetter(event, start, end, isSelected) {
        // let current_time = moment().format('YYYY MM DD');
        // let event_time = moment(event.start).format('YYYY MM DD');
        let background = 'transparent' ;
        let borderBottom = '1px solid gray';
        return {
            style: {
                backgroundColor: background,
                borderBottom: borderBottom,
            }
        };
    }
    
    render() {
        return (
            <div className="calendar-container">
                <MyCalendar
                    popup
                    selectable
                    localizer={localizer}
                    defaultView={MyCalendar.Views.MONTH}
                    components={{toolbar: CustomToolbar}}
                    views={['month']}
                    style={{height: 600}}
                    events={this.props.events}
                    eventPropGetter={(this.eventStyleGetter)}
                    onSelectEvent={(slotInfo) => this.onSelectEventHandler(slotInfo)}
                    onSelectSlot={(slotInfo) => this.onSelectEventSlotHandler(slotInfo)}
                />
                <Popup />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        events: state.events
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
        fetchEvents, 
        createEvent, 
        updateEvent, 
        deleteEvent
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
