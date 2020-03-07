import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './modules/assets/fonts/iconfont.css';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Main from './modules/main.js';
import Login from './Login';
import Show from './Show';
import axios from 'axios';
import config from './common.js';
import House from './modules/home/list';

axios.defaults.baseURL = config.apiBaseUrl;
axios.interceptors.request.use(function (config) {
    if(!config.url.endsWith('/login')){
        //所有请求发送前会有一个预请求options，该请求不能携带自定义请求头，所有该请求到后端如果不加处理的话不能正常返回，
        //会导致真正的请求无法请求
        config.headers.Authorization = localStorage.getItem('mytoken');
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
  console.log('拦截的响应'+response.data)
    if (response.data == 50000){
        window.location.href = '/'
    }
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

class App extends Component {
    render() {
        return (
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/show" component={Show}/>
                <Route path="/home" component={Main}/>
                <Route path="/abc" component={House} />
                <Redirect to="/"/>
              </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
