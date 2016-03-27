toggleCinePlay = function(element) {
    var viewports = $('.imageViewerViewport');

    if (!element) {
        var viewportIndex = Session.get('activeViewport');
        element = viewports.get(viewportIndex);
    }

    if (!element) {
        return;
    }

    var isPlaying = OHIF.viewer.isPlaying[viewportIndex] || false;
    if (isPlaying) {
        cornerstoneTools.stopClip(element);
    } else {
        cornerstoneTools.playClip(element);
    }

    OHIF.viewer.isPlaying[viewportIndex] = !OHIF.viewer.isPlaying[viewportIndex];
    Session.set('UpdateCINE', Random.id());
};

isPlaying = function() {
    Session.get('UpdateCINE');
    var activeViewport = Session.get('activeViewport');

    // TODO=Check best way to make sure this is always defined
    // Right now it is initialized in enableHotkeys AND in
    // imageViewer onCreated, but this appears to break some things
    if (!OHIF.viewer.isPlaying) {
        return;
    }

    return !!OHIF.viewer.isPlaying[activeViewport];
};

/*Template.playClipButton.helpers({
    isPlaying: function() {
        return isPlaying();
    }
});

Template.playClipButton.events({
    'click #playClip': function() {
        toggleCinePlay();
    },
    'click #toggleCineDialog': function() {
        var cineDialog = document.getElementById('cineDialog');
        toggleDialog(cineDialog);
    }
});*/

import React, { Component } from 'react';

export default class PlayClipButton extends Component {
    render() {
        return (
            <div className="btn-group">
                <button id="playClip" type="button" className="imageViewerCommand btn btn-sm btn-default"
                        data-container="body" data-toggle="tooltip" data-placement="bottom" title="Play/Stop Clip">
                    {this.props.isPlaying ? <span className="fa fa-stop"></span> : <span className="fa fa-play"></span> }
                </button>
                <button id="toggleCineDialog" type="button" className="imageViewerCommand btn btn-sm btn-default" data-container="body" data-toggle="tooltip" data-placement="bottom" title="Toggle CINE Dialog">
                    <span className="fa fa-youtube-play"></span>
                </button>
            </div>
        );
    }
}

PlayClipButton.propTypes = {
    isPlaying: React.PropTypes.string.bool
};

PlayClipButton.defaultProps = {
    isPlaying: false
};
