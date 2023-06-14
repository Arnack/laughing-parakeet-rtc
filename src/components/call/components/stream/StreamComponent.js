import React, { Component } from 'react';
import { Box, IconButton, FormControl, Input, FormLabel, FormHelperText } from "@chakra-ui/react";
import { MdMicOff, MdVideocamOff, MdVolumeUp, MdVolumeOff, MdHighlightOff } from "react-icons/md";
import OvVideoComponent from './OvVideo';
import './StreamComponent.css';

export default class StreamComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { nickname: this.props.user.getNickname(), showForm: false, mutedSound: false, isFormValid: true };
        this.handleChange = this.handleChange.bind(this);
        this.handlePressKey = this.handlePressKey.bind(this);
        this.toggleNicknameForm = this.toggleNicknameForm.bind(this);
        this.toggleSound = this.toggleSound.bind(this);
    }

    handleChange(event) {
        this.setState({ nickname: event.target.value });
        event.preventDefault();
    }

    toggleNicknameForm() {
        if (this.props.user.isLocal()) {
            this.setState({ showForm: !this.state.showForm });
        }
    }

    toggleSound() {
        this.setState({ mutedSound: !this.state.mutedSound });
    }

    handlePressKey(event) {
        if (event.key === 'Enter') {
            console.log(this.state.nickname);
            if (this.state.nickname.length >= 3 && this.state.nickname.length <= 20) {
                this.props.handleNickname(this.state.nickname);
                this.toggleNicknameForm();
                this.setState({ isFormValid: true });
            } else {
                this.setState({ isFormValid: false });
            }
        }
    }

    render() {
        return (
            <Box className="OT_widget-container">
                <Box className="pointer nickname">
                    {this.state.showForm ? (
                        <FormControl id="nicknameForm">
                            <IconButton color="inherit" id="closeButton" onClick={this.toggleNicknameForm} icon={<MdHighlightOff />} />
                            <FormLabel htmlFor="name-simple" id="label">
                                Nickname
                            </FormLabel>
                            <Input
                                color="inherit"
                                id="input"
                                value={this.state.nickname}
                                onChange={this.handleChange}
                                onKeyPress={this.handlePressKey}
                                required
                            />
                            {!this.state.isFormValid && this.state.nickname.length <= 3 && (
                                <FormHelperText id="name-error-text">Nickname is too short!</FormHelperText>
                            )}
                            {!this.state.isFormValid && this.state.nickname.length >= 20 && (
                                <FormHelperText id="name-error-text">Nickname is too long!</FormHelperText>
                            )}
                        </FormControl>
                    ) : (
                        <Box onClick={this.toggleNicknameForm}>
                            <span id="nickname">{this.props.user.getNickname()}</span>
                            {this.props.user.isLocal() && <span id=""> (edit)</span>}
                        </Box>
                    )}
                </Box>

                {this.props.user !== undefined && this.props.user.getStreamManager() !== undefined ? (
                    <Box className="streamComponent">
                        <OvVideoComponent user={this.props.user} mutedSound={this.state.mutedSound} />
                        <Box id="statusIcons">
                            {!this.props.user.isVideoActive() ? (
                                <Box id="camIcon">
                                    <MdVideocamOff id="statusCam" />
                                </Box>
                            ) : null}

                            {!this.props.user.isAudioActive() ? (
                                <Box id="micIcon">
                                    <MdMicOff id="statusMic" />
                                </Box>
                            ) : null}
                        </Box>
                        <Box>
                            {!this.props.user.isLocal() && (
                                <IconButton id="volumeButton" onClick={this.toggleSound} icon={this.state.mutedSound ? <MdVolumeOff color="red" /> : <MdVolumeUp />} />
                            )}
                        </Box>
                    </Box>
                ) : null}
            </Box>
        );
    }
}
