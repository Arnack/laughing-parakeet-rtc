'use client'

import React, { Component } from 'react';
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import './DialogExtension.css';

export default class DialogExtensionComponent extends Component {
    constructor(props) {
        super(props);
        this.openviduExtensionUrl =
            'https://chrome.google.com/webstore/detail/openvidu-screensharing/lfcgfepafnobdloecchnfaclibenjold';
        //isInstalled: boolean;

        this.state = {
            isInstalled: false,
        };
        this.goToChromePage = this.goToChromePage.bind(this);
        this.onNoClick = this.onNoClick.bind(this);
        this.refreshBrowser = this.refreshBrowser.bind(this);
    }

    componentWillReceiveProps(props) {}

    componentDidMount() {}

    onNoClick() {
        // this.cancel.emit();
        this.props.cancelClicked();
    }

    goToChromePage() {
        window.open(this.openviduExtensionUrl);
        this.setState({ isInstalled: true });
    }

    refreshBrowser() {
        window.location.reload();
    }

    render() {
        return (
            <Box>
                {this.props && this.props.showDialog ? (
                    <Box id="dialogExtension">
                        <Box id="card" borderWidth="1px" borderRadius="lg" overflow="hidden">
                            <VStack p="6" spacing="4">
                                <Text color="gray.500">Hello</Text>
                                <Text color="gray.500">
                                    You need to install this chrome extension and refresh the browser for can share your screen.
                                </Text>
                                <Button size="sm" onClick={this.onNoClick}>
                                    Cancel
                                </Button>

                                <Button size="sm" onClick={this.goToChromePage}>
                                    Install
                                </Button>
                                {this.state.isInstalled ? (
                                    <Button size="sm" onClick={this.refreshBrowser}>
                                        Refresh
                                    </Button>
                                ) : null}
                            </VStack>
                        </Box>
                    </Box>
                ) : null}
            </Box>
        );
    }
}
