import React, { Component } from 'react'
import Header from './ui-component/header'
import '../../css/service.css'
import RouterComponent from "./ui-component/RouterComponent";

export class index extends Component {   
    

    componentDidMount(){
        this.props.handleLinkActive('serviceState');        
    }

    
    render() {
        return (
            <div className="service-transiton-container">
                <Header/> 
                <RouterComponent leftSideState={this.props.s} />
            </div>           
        );
      }
}

export default index
