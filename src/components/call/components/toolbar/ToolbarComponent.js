import React, { Component } from 'react';
import { Box, IconButton, Tooltip } from "@chakra-ui/react";
import { 
    MdMic, MdMicOff, MdVideocam, MdVideocamOff, MdFullscreen, MdFullscreenExit, 
    MdSwitchVideo, MdPictureInPicture, MdScreenShare, MdStopScreenShare, 
    MdPowerSettingsNew, MdQuestionAnswer 
} from "react-icons/md";
import './ToolbarComponent.css';

const logo = require('../../assets/images/openvidu_logo.png');

export default class ToolbarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { fullscreen: false };
        this.camStatusChanged = this.camStatusChanged.bind(this);
        this.micStatusChanged = this.micStatusChanged.bind(this);
        this.screenShare = this.screenShare.bind(this);
        this.stopScreenShare = this.stopScreenShare.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
    }

    // ... all your methods remain the same

    render() {
        const mySessionId = this.props.sessionId;
        const localUser = this.props.user;
        return (
            <Box className="toolbar" id="header">
                <Box className="toolbar">
                    <Box id="navSessionInfo">
                        <img
                            id="header_img"
                            alt="OpenVidu Logo"
                            src={logo}
                        />

                        {this.props.sessionId && <Box id="titleContent">
                            <span id="session-title">{mySessionId}</span>
                        </Box>}
                    </Box>

                    <Box className="buttonsContent">
                        <IconButton color="inherit" className="navButton" id="navMicButton" onClick={this.micStatusChanged} icon={localUser !== undefined && localUser.isAudioActive() ? <MdMic /> : <MdMicOff color="red" />} />
                        <IconButton color="inherit" className="navButton" id="navCamButton" onClick={this.camStatusChanged} icon={localUser !== undefined && localUser.isVideoActive() ? <MdVideocam /> : <MdVideocamOff color="red" />} />
                        <IconButton color="inherit" className="navButton" onClick={this.screenShare} icon={localUser !== undefined && localUser.isScreenShareActive() ? <MdPictureInPicture /> : <MdScreenShare />} />
                        
                        {localUser !== undefined &&
                            localUser.isScreenShareActive() && (
                                <IconButton onClick={this.stopScreenShare} id="navScreenButton" icon={<MdStopScreenShare color="red" />} />
                            )}

                        <IconButton color="inherit" className="navButton" onClick={this.switchCamera} icon={<MdSwitchVideo />} />
                        <IconButton color="inherit" className="navButton" onClick={this.toggleFullscreen} icon={localUser !== undefined && this.state.fullscreen ? <MdFullscreenExit /> : <MdFullscreen />} />
                        <IconButton color="red" className="navButton" onClick={this.leaveSession} id="navLeaveButton" icon={<MdPowerSettingsNew />} />
                        <IconButton color="inherit" onClick={this.toggleChat} id="navChatButton" icon={<Tooltip label="Chat" fontSize="md"><MdQuestionAnswer /></Tooltip>} />
                    </Box>
                </Box>
            </Box>
        );
    }
}
