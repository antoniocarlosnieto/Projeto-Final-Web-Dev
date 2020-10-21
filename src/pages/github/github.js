import React, { Component } from "react";
import "./github.css";
import logo from "../../images/logo.png"

class Github extends Component{
    constructor(){
        super();
        this.state = {
            user: [],
            repo: [],
        };
    }

    componentDidMount(){
        fetch("https://api.github.com/users/antoniocarlosnieto") //Esse comando pega as infos da API
        .then( response => response.json() ) //Esse comando converte as infos para o formato json
        .then( data => {this.setState({user: data})} ); //Esse comando coloca o valor data2 dentro do atributo data

        fetch("https://api.github.com/users/antoniocarlosnieto/repos") //Esse comando pega as infos da API
        .then( response => response.json() ) //Esse comando converte as infos para o formato json
        .then( data => {this.setState({repo: data})} ); //Esse comando coloca o valor data2 dentro do atributo data
    }


    render(){
        const {user, repo} = this.state;
        return <>
        <div className="container">

        <div className = "row">

            <div className="col-3">
                <p>Meu Github  Infos</p>
            
                    <div>
                        <img className="circle-photo rotate" src={user.avatar_url} alt=""></img>
                        
                        <img className="circle-photo rotate"src={logo} alt="logo"></img>
                        
                            <div>
                                Login: @{user.login} <br/>
                                Name: {user.name} <br/>
                                Company: {user.company} <br/>
                                Location: {user.location} <br/>

                            </div>
                    </div>
            </div>

            
            <div className="col-9">
            {repo.map(
                repositorio => 
                <p className="bg-card">
                    Nome do Repositorio: {repositorio.name}<br/>
                    Descrição: {repositorio.description} <br/>
                    Link do Repositório: <a href={repositorio.html_url}>Clique aqui</a>
                </p>
            )}
            </div>

        </div>

        </div>
        
        
             
        </>;
    }

}




export default Github;