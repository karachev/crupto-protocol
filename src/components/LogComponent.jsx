import React from 'react';
import { Row, Col, Card } from 'reactstrap';
import '../App.css';

export default class LogComponent extends React.PureComponent {

  render() {
    const {logInfo} = this.props;
    return (
      <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
        <div style={{ height: `${window.innerHeight-130}px`, overflow: 'auto'}}>
          {logInfo.map((info, index)=> {
              const text = info.split('\n');
              return (
                <span key = {`info_${index}`}>
                  {text.map( (message, i) => (
                    <div className={(i==0)?"text-danger":"text-success"} style={{whiteSpace: 'pre'}} key = {`info_${index}_message_${i}`}> {message.toString()} </div>
                  ))}
                  <br/>
                </span>
              ) 
            })
          }
        </div>
      </Card>
    );
  }
}