import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class ListProfiles extends Component {
  render() {
    return (
        <div className="">
        <div className="row">
            <div className="list-group">
                <div className="list-group-item clearfix">
                    <div className="profile-teaser-left">
                        <div className="profile-img"><img src="https://static.pexels.com/photos/21011/pexels-photo-large.jpg"/></div>
                    </div>
                    <div className="profile-teaser-main">
                        <h2 className="profile-name">Jane Doe</h2>
                        <div className="profile-info">
                            <div className="far-left-button"><Button classname="primary"> Follow</Button> Something here</div>
                            <div className="info"><span className="">Info:</span> Something here</div>
                            <div className="info"><span className="">Info:</span> Something here</div>
                            <div className="info"><span className="">Info:</span> Something here</div>
                        </div>
                    </div>
                </div>
                
                <div className="list-group-item clearfix">
                    <div className="profile-teaser-left">
                        <div className="profile-img"><img src="https://static.pexels.com/photos/21011/pexels-photo-large.jpg"/></div>
                    </div>
                    <div className="profile-teaser-main">
                        <h2 className="profile-name">Jane Doe</h2>
                        <div className="profile-info">
                            <div className="info"><span className="">Info:</span> Something here</div>
                            <div className="info"><span className="">Info:</span> Something here</div>
                            <div className="info"><span className="">Info:</span> Something here</div>
                            <div className="info"><span className="">Info:</span> Something here</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }
}
