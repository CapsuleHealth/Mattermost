// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import UserStore from 'stores/user_store.jsx';
import TeamStore from 'stores/team_store.jsx';
import PreferenceStore from 'stores/preference_store.jsx';
import * as AsyncClient from 'utils/async_client.jsx';
import * as GlobalActions from 'actions/global_actions.jsx';

import {Constants, Preferences} from 'utils/constants.jsx';

import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import {browserHistory} from 'react-router/es6';

import AppIcons from 'images/appIcons.png';

// MODIFIED 2017-02-23: adding logo
import logoImage from 'images/capsule-connect-logo.svg';

const NUM_SCREENS = 3;

import React from 'react';

export default class TutorialIntroScreens extends React.Component {
    static get propTypes() {
        return {
            townSquare: React.PropTypes.object,
            offTopic: React.PropTypes.object
        };
    }
    constructor(props) {
        super(props);

        this.handleNext = this.handleNext.bind(this);
        this.createScreen = this.createScreen.bind(this);
        this.createCircles = this.createCircles.bind(this);

        this.state = {currentScreen: 0};
    }
    handleNext() {
        if (this.state.currentScreen < 2) {
            this.setState({currentScreen: this.state.currentScreen + 1});
            return;
        }

        browserHistory.push(TeamStore.getCurrentTeamUrl() + '/channels/town-square');

        const step = PreferenceStore.getInt(Preferences.TUTORIAL_STEP, UserStore.getCurrentId(), 0);

        AsyncClient.savePreference(
            Preferences.TUTORIAL_STEP,
            UserStore.getCurrentId(),
            (step + 1).toString()
        );
    }
    skipTutorial(e) {
        e.preventDefault();

        AsyncClient.savePreference(
            Preferences.TUTORIAL_STEP,
            UserStore.getCurrentId(),
            '999'
        );

        browserHistory.push(TeamStore.getCurrentTeamUrl() + '/channels/town-square');
    }
    createScreen() {
        switch (this.state.currentScreen) {
        case 0:
            return this.createScreenOne();
        case 1:
            return this.createScreenTwo();
        case 2:
            return this.createScreenThree();
        }
        return null;
    }
    createScreenOne() {
        const circles = this.createCircles();

        // MODIFIED 2017-02-23: adding welcome header
        // MODIFIED 2017-02-23: adding logo
        return (
            <div>
                <FormattedHTMLMessage
                    id='tutorial_intro.screenOne.welcome'
                    defaultMessage='<h3>Welcome to</h3>'
                />
                <img
                    className='tutorial-team-logo'
                    src={logoImage}
                />
                <FormattedHTMLMessage
                    id='tutorial_intro.screenOne'
                    defaultMessage='<h3>Welcome to:</h3>
                    <h1>Mattermost</h1>
                    <p>Your team communication all in one place, instantly searchable and available anywhere.</p>
                    <p>Keep your team connected to help them achieve what matters most.</p>'
                />
                {circles}
            </div>
        );
    }
    createScreenTwo() {
        const circles = this.createCircles();

        let appDownloadLink = null;
        let appDownloadImage = null;
        if (global.window.mm_config.AppDownloadLink) {
            // not using a FormattedHTMLMessage here since mm_config.AppDownloadLink is configurable and could be used
            // to inject HTML if we're not careful
            appDownloadLink = (
                <FormattedMessage
                    id='tutorial_intro.mobileApps'
                    defaultMessage='Install the apps for {link} for easy access and notifications on the go.'
                    values={{
                        link: (
                            <a
                                href={global.window.mm_config.AppDownloadLink}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <FormattedMessage
                                    id='tutorial_intro.mobileAppsLinkText'
                                    defaultMessage='PC, Mac, iOS and Android'
                                />
                            </a>
                        )
                    }}
                />
            );

            appDownloadImage = (
                <a
                    href={global.window.mm_config.AppDownloadLink}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <img
                        className='tutorial__app-icons'
                        src={AppIcons}
                    />
                </a>
            );
        }

        return (
            <div>
                <FormattedHTMLMessage
                    id='tutorial_intro.screenTwo'
                    defaultMessage='<h3>How Mattermost works:</h3>
                    <p>Communication happens in public discussion channels, private groups and direct messages.</p>
                    <p>Everything is archived and searchable from any web-enabled desktop, laptop or phone.</p>'
                />
                {appDownloadLink}
                {appDownloadImage}
                {circles}
            </div>
        );
    }
    createScreenThree() {
        const team = TeamStore.getCurrent();
        let inviteModalLink;
        let inviteText;

        if (global.window.mm_license.IsLicensed !== 'true' || global.window.mm_config.RestrictTeamInvite === Constants.PERMISSIONS_ALL) {
            if (team.type === Constants.INVITE_TEAM) {
                inviteModalLink = (
                    <a
                        className='intro-links'
                        href='#'
                        onClick={GlobalActions.showInviteMemberModal}
                    >
                        <FormattedMessage
                            id='tutorial_intro.invite'
                            defaultMessage='Invite teammates'
                        />
                    </a>
                );
            } else {
                inviteModalLink = (
                    <a
                        className='intro-links'
                        href='#'
                        onClick={GlobalActions.showGetTeamInviteLinkModal}
                    >
                        <FormattedMessage
                            id='tutorial_intro.teamInvite'
                            defaultMessage='Invite teammates'
                        />
                    </a>
                );
            }

            inviteText = (
                <p>
                    {inviteModalLink}
                    <FormattedMessage
                        id='tutorial_intro.whenReady'
                        defaultMessage=' when you’re ready.'
                    />
                </p>
            );
        }

        const circles = this.createCircles();

        let supportInfo = null;
        if (global.window.mm_config.SupportEmail) {
            supportInfo = (
                <p>
                    <FormattedMessage
                        id='tutorial_intro.support'
                        defaultMessage='Need anything, just email us at '
                    />
                    <a
                        href={'mailto:' + global.window.mm_config.SupportEmail}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        {global.window.mm_config.SupportEmail}
                    </a>
                    {'.'}
                </p>
            );
        }

        // eslint-disable-next-line no-unused-vars
        let townSquareDisplayName = Constants.DEFAULT_CHANNEL_UI_NAME;
        if (this.props.townSquare) {
            townSquareDisplayName = this.props.townSquare.display_name;
        }

        return (
            <div>
                <h3>
                    <FormattedMessage
                        id='tutorial_intro.allSet'
                        defaultMessage='You’re all set'
                    />
                </h3>
                {inviteText}
                {supportInfo}
                { /* MODIFIED 2017-02-23: removed tutorial intro end */}
                {circles}
            </div>
        );
    }
    createCircles() {
        const circles = [];
        for (let i = 0; i < NUM_SCREENS; i++) {
            let className = 'circle';
            if (i === this.state.currentScreen) {
                className += ' active';
            }

            circles.push(
                <a
                    href='#'
                    key={'circle' + i}
                    className={className}
                    onClick={(e) => { //eslint-disable-line no-loop-func
                        e.preventDefault();
                        this.setState({currentScreen: i});
                    }}
                />
            );
        }

        return (
            <div className='tutorial__circles'>
                {circles}
            </div>
        );
    }
    render() {
        const screen = this.createScreen();

        return (
            <div className='tutorial-steps__container'>
                <div className='tutorial__content'>
                    <div className='tutorial__steps'>
                        {screen}
                        <div className='tutorial__footer'>
                            <button
                                className='btn btn-primary'
                                tabIndex='1'
                                onClick={this.handleNext}
                            >
                                <FormattedMessage
                                    id='tutorial_intro.next'
                                    defaultMessage='Next'
                                />
                            </button>
                            <a
                                className='tutorial-skip'
                                href='#'
                                onClick={this.skipTutorial}
                            >
                                <FormattedMessage
                                    id='tutorial_intro.skip'
                                    defaultMessage='Skip tutorial'
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
