import React from 'react';
import { Row, Col, Card } from 'reactstrap';
import '../App.css';

export default class LogComponent extends React.PureComponent {

  render() {
    const {logInfo} = this.props;
    return (
      <Card body style={{ backgroundColor: '#edeef0', boxShadow: '0 1px 0 0 #d7d8db, 0 0 0 1px #e3e4e8',}}>
        <div style={{ height: `${window.innerHeight-130}px`, overflow: 'auto'}}>
          {logInfo.map((info, index)=> {
              const text = info.split('\n');
              return (
                <span key = {`info_${index}`}>
                  {text.map( (message, i) => (
                    <div className={(i==0)?"text-primary":"text-success"} style={{whiteSpace: 'pre'}} key = {`info_${index}_message_${i}`}> {message.toString()} </div>
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