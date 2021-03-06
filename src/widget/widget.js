
define(['react', 'Wix'], function (React, Wix) {
    const Converter = require('../widget/convertor');
    return React.createClass({
        getInitialState: () => {
            return {
                settingsUpdate: {},
                showBox: false
            }
        },
        componentDidMount: function () {
            this.updateCompHeight(600);
            Wix.addEventListener(Wix.Events.SETTINGS_UPDATED, (data) => this.onSettingsUpdate(data));

            // You can get the style params programmatically, un-comment the following snippet to see how it works:
            /*Wix.Styles.getStyleParams(function (style) {
             console.log(style);
             });*/

            // You can also get the style every time it changes, try this:
            /*Wix.addEventListener(Wix.Events.STYLE_PARAMS_CHANGE, function (style) {
             console.log(style);
             });*/
        },
        onSettingsUpdate: function (update) {
            this.setState({
                settingsUpdate: update,
                showBox: true
            }, this.updateCompHeight);
        },
        updateCompHeight: (height) => {
            const desiredHeight = height || document.documentElement.scrollHeight;
            Wix.setHeight(desiredHeight);
        },
        navToHome: () => {
            Wix.getSiteMap(pages => {
                Wix.navigateToPage(pages[0].pageId.substring(1));
            });
        },
        stringify: (input) => {
            try {
                return JSON.stringify(input, null, 4);
            } catch (err) {
                return input;
            }
        },
        render: function () {
            const { settingsUpdate, usd, nis } = this.state;
            return (
                <div>
                    <div className="wix-style-sample">
                        <h3 className="sample-element sample-title">{"Currency App"}</h3>
                        <p className="sample-element sample-content">{"Welcome to the currency App (only EUR TO USD)!"}</p>
                        <br />
                        <h1>
                            <Converter/>
                        </h1>
                        <br />
                        <a onClick={() => this.navToHome()}>{"Go to Home Page"}</a>
                        <br />
                        <hr />
                        <div className={this.state.showBox ? "" : "hiddenBox"}>
                            <h3 className="sample-element sample-title">{"Last settings update"}</h3>
                            <pre>
                                <code className="json sample-content">{this.stringify(settingsUpdate)}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            )
        }
    });
});
