import React from 'react';
import ReactDom from 'react-dom';
import { Alert, Container, Row, Col, Button, Input, Card, FormGroup, Label } from 'reactstrap';
import LogComponent from './LogComponent';
import ChatComponent from './ChatComponent';
import '../App.css';
import { User, BlomScheme, Rc4 } from '../util';

export default class ContainerComponent extends React.PureComponent {

  constructor(props) {
    super(props)
    this.Kdc = new BlomScheme(4, 1024);
    let matrixString = '\n';
    for (let i = 0; i < this.Kdc.secrMatrix.length; i++) {
      matrixString += '    '+this.Kdc.secrMatrix[i].join(', ') + '\n';
    }
    const logInfo = [
    `${(new Date).toTimeString()}\nПараметры KDC:\n  размер матрицы: ${this.Kdc.size}\n  матрица: ${matrixString}  модуль: ${this.Kdc.module}`];
    this.state = {
      users: [],
      messages: [],
      activeUsername: {},
      errorUser: null,
      logInfo: logInfo,
    };
  };

  setActiveUsername = username => {
    this.setState({
      activeUsername: username
    })
  };

  addMessage = message => {
    const messages = this.state.messages.slice();
    const encryptMessages = {};

    let logMessage = `${(new Date).toTimeString()}\nНовое сообщение:\n  ${message.text}\n`

    for (let i = 0; i < this.state.users.length; i++) {
      const user = this.state.users[i];
      const key = ''+message.user.calculateKey(user.openId);
      encryptMessages[user.id] = Rc4(key, message.text);
      logMessage += `${user.id} получает:\n  ${encryptMessages[user.id]}\n  ключ шифрования: ${key}\n\n`;
    }

    const logInfo = this.state.logInfo.slice();
    logInfo.push(logMessage);
    message.text = encryptMessages;

    messages.push(message);
    this.setState({logInfo, messages});
  };

  addUser = e => {

    const username = ReactDom.findDOMNode(this.username).value;

    const users = this.state.users.slice();
    const logInfo = this.state.logInfo.slice();
    if(users.findIndex(t=> t.id === username) === -1) {
      
      const openId = this.Kdc.getOpentId(username);
      const secretId = this.Kdc.getSecret(openId);
      const module = this.Kdc.getSecret(openId);
      const user = new User(username, openId, secretId, this.Kdc.getModule());
      users.push(user);
      logInfo.push(`${(new Date).toTimeString()}\nНовый участник: ${user.id}\n  открытый ключ: ${user.openId.join(', ')}\n  закрытый ключ: ${user.secretId.join(', ')}`)

      this.setState({
        logInfo,
        users,
        errorUser: null
      });

    } else {
      this.setState({
        errorUser: username
      });
    }
  };

  getUsername = ref => this.username = ref; 

  render() {
    return (
      <Col xs ={12} style={{marginTop: '15px'}}>
        <Row>
          <Col xs ={5}>
            <LogComponent
              logInfo = {this.state.logInfo}
            />
          </Col>
  
          <Col xs ={7}>
            <ChatComponent
              errorUser = {this.state.errorUser}
              getUsername = {this.getUsername}
              addUser = {this.addUser}
              usernames = {this.state.users}
              setActiveUsername = {this.setActiveUsername}
              activeUsername = {this.state.activeUsername}
              messages = {this.state.messages}
              addMessage = {this.addMessage}
            />
          </Col>

        </Row>
      </Col>
    );
  }
}