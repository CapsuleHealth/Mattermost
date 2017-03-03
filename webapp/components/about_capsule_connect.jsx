
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import React from 'react';

// ADDED 2017-03-03
export default class AboutCapsuleConnect extends React.Component {
    render() {
        return (
            <div className='container col-sm-8 col-sm-offset-1'>
                <h2>
                    <FormattedMessage
                        id='about_capsule_connect.title'
                        defaultMessage='About Capsule Connect'
                    />
                </h2>
                <br/>
                <br/>
                <p>
                    <FormattedHTMLMessage
                        id='about_capsule_connect.body'
                        defaultMessage='Capsule Connect is powered by <a href="https://about.mattermost.com/" rel="noreferrer">Mattermost</a>, an open-source, private cloud Slack&#8209;alternative. The <a href="https://github.com/CapsuleHealth/platform">source code</a> and <a href="https://github.com/CapsuleHealth/platform/blob/master/LICENSE.txt">license</a> are available on <a href="https://github.com/CapsuleHealth/platform">Github</a>. Use of the software is subject to Mattermost&apos;s <a href="https://about.mattermost.com/default-terms/" rel="noreferrer">terms of service<a/> and <a href="https://github.com/CapsuleHealth/platform/blob/master/build/PRIVACY_POLICY.md">privacy policy</a>.'
                    />
                </p>
            </div>
        );
    }
}
