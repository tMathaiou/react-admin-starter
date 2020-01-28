import React from "react";
import './loader.css'

interface LoaderProps {
    loading?: boolean;
    color?: string
    height?: string
    width?: string
    margin?: string
    radius?: string
}

class Loader extends React.Component<LoaderProps> {
    public spinnerStyle = {
        backgroundColor: this.props.color || '#5dc596',
        height: this.props.height || '35px',
        width: this.props.width || '4px',
        margin: this.props.margin || '2px',
        borderRadius: this.props.radius || '2px',
        display: 'inline-block',
        animationName: 'v-scaleStretchDelay',
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'cubic-bezier(.2,.68,.18,1.08)',
        animationFillMode: 'both',
    };
    public spinnerDelay1 = {animationDelay: '0.1s'};
    public spinnerDelay2 = {animationDelay: '0.2s'};
    public spinnerDelay3 = {animationDelay: '0.3s'};
    public spinnerDelay4 = {animationDelay: '0.4s'};
    public spinnerDelay5 = {animationDelay: '0.5s'};

    render() {
        return (
            this.props.loading ?
                <div className="overlay-wrapper">
                    <div className="v-spinner">
                        <div className="v-scale v-scale1" style={{...this.spinnerStyle, ...this.spinnerDelay1}}>
                        </div>
                        <div className="v-scale v-scale2" style={{...this.spinnerStyle, ...this.spinnerDelay2}}>
                        </div>
                        <div className="v-scale v-scale3" style={{...this.spinnerStyle, ...this.spinnerDelay3}}>
                        </div>
                        <div className="v-scale v-scale4" style={{...this.spinnerStyle, ...this.spinnerDelay4}}>
                        </div>
                        <div className="v-scale v-scale5"  style={{...this.spinnerStyle, ...this.spinnerDelay5}}>
                        </div>
                    </div>
                </div>
                : ''
        );
    }
}

export default Loader;
