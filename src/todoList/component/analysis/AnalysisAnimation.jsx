import React from 'react';
class AnalysisAnimation extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cur: 0
        }
    }
    render() {
        return <img className="water-tower" src={`./image/analysis/animate-${this.state.cur+1}.png`} />
    }

    componentDidMount() {
        let i = 0;
        setInterval(() => {
            if(i === 6) {
                i = 0;
            }
            this.setState({
                cur: i
            })
            i++
        }, 1000)
    }

}

export default AnalysisAnimation;

