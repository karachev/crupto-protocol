import React from 'react';
import ReactDom from 'react-dom';
import { Alert, Row, Col, Button, Input, Card, FormGroup, Label, ListGroupItem, ListGroup, FormFeedback } from 'reactstrap';
import LogComponent from './LogComponent';
import '../App.css';
import { Rc4 } from '../util';

class Manager extends React.PureComponent {

  render() {
    return (
      <Card body outline color="primary" style = {{height: '200px'}}>

        <Row>
          <Col xs ={6}>

            <FormGroup >

              <Label for="username" >
                Имя участника
              </Label>

              <Input
                invalid = {!!this.props.errorUser} 
                type="username" 
                name="username" 
                id="username" 
                placeholder="Имя участника" 
                ref = {this.props.getUsername} 
              />

              <FormFeedback>{` ${this.props.errorUser} уже существует!`}</FormFeedback>
              
            </FormGroup>

            <Button block color="primary" onClick={this.props.addUser}>
              Добавить участника
            </Button>
          </Col>

          <Col xs ={6} className="users-container">
            <ListGroup>

              {this.props.usernames.map((username, i)=> (
                <ListGroupItem
                  key = {`username_${username.id+i}`}
                  action
                  active = {username.id === this.props.activeUsername.id}
                  tag="a"
                  onClick={()=>this.props.setActiveUsername(username)}
                >
                <b> {username.id} </b>
                </ListGroupItem>
              ))}

            </ListGroup>
          </Col>
        </Row>
      </Card>
    );
  }
}

class Chat extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  addMessage = e => {
    const message = ReactDom.findDOMNode(this.message).value;
    if(message) {
      this.props.addMessage({
        user: this.props.activeUsername,
        text: message
      }) 
    }
  };

  decryptMessage(message) {
    const text = message.text[this.props.activeUsername.id];
    if(text) {
      const sender = message.user;
      const receiver = this.props.activeUsername;
      const key = receiver.calculateKey(sender.openId);
      return (
        <React.Fragment>
           {`Ключ дешифрования: ${key}`}
           <br/>
           {`Зашифровано: ${text}`}
           <br/>
           {`Расшифровано: ${Rc4(key,text)}`}
        </React.Fragment>
      );
    } else return '';
  };

  getMessage = ref => this.message = ref;

  render() {
    const messages = this.props.messages || [];
    return (
      <Card body outline color="info" >
        <Row>
  
          <Col xs={12} className="message-container" >
            {messages.map((message,i)=> {
              const style = {
                transition: 'all 0.2s ease-in'
              };
              if(message.user.id === this.props.activeUsername.id) {
                style.marginRight = '80px';
              } else {
                style.marginLeft = '80px';
              }
              return (
                <Alert key ={message+i} style={style} color={(message.user.id === this.props.activeUsername.id) ? "success" : "primary"}>
                  <strong>{`${message.user.id} пишет:`}</strong>
                  <br/>
                  {this.decryptMessage(message) || 'Участник присоеденился после отправки сообщения!'}
                </Alert>
              )
            })}
          </Col>
          
          <Col xs ={12}>
           {this.props.activeUsername.id && (
              <FormGroup>

                <Label for="messageText" className ='text-center'>{`Участник: ${this.props.activeUsername.id}`}</Label>
                <Input style={{minHeight: '150px'}} type="textarea" name="messageText" id="messageText" ref = {this.getMessage} />
                <Button className='btn-info' block onClick={this.addMessage}>
                  Отправить сообщение
                </Button>

              </FormGroup>
            )}
          </Col>

        </Row>

      </Card>
    );
  }
}


export default class ChatComponent extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
        <React.Fragment>

          <div style ={{marginBottom:'20px'}}>
            <Manager
              errorUser = {this.props.errorUser}
              getUsername = {this.props.getUsername}
              addUser = {this.props.addUser}
              usernames = {this.props.usernames}
              activeUsername = {this.props.activeUsername}
              setActiveUsername = {this.props.setActiveUsername}
              usernames = {this.props.usernames}
            />
          </div>

          <div>
            <Chat
              messages = {this.props.messages}
              addMessage = {this.props.addMessage}
              activeUsername = {this.props.activeUsername}
            />
          </div>

        </React.Fragment>
    );
  }
}