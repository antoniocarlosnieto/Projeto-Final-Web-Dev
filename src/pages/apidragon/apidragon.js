import React, { Component } from 'react';
import { Modal, Button, Form} from "react-bootstrap";
import './apidragon.css';

class Apidragon extends Component {
    constructor(){
        super();
        this.state = {listDragons: [], showModal: false, showAlert: false}; 
    }

    componentDidMount(){
        this.getList();
    }

    getList(){
        fetch('http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon') 
        .then( response => response.json() ) 
        .then( data => {this.setState({listDragons: data}); } );
    }

    onCreate(event){
        event.preventDefault();
        let form = event.target;
        // var nomeUser= ""
        // var tipoUser= ""
        // nomeUser = prompt ("Digite um nome para o novo Dragão:")
        // alert ("O nome do novo dragão será: " + nomeUser)
        // tipoUser = prompt (" Digite o tipo do novo Dragão:")
        // alert ("O tipo do novo dragão será: " + tipoUser)

        
        const dragon = {name: form.elements.name.value, type: form.elements.type.value};
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dragon)
        }

        fetch('http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon', request)
        .then(response => response.json())
        .then( () => this.getList())        
    }

    onEdit(id){
        console.log('Edit:'+id)
    }

    onDelete(id){
        fetch('http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/'+id, {method: 'DELETE'})
        .then(response => response.json())
        .then(response2 => this.getList())
    }

    handleModalClose(){
        this.setState({showModal: false});
    }

    handleModalOpen(){
        this.setState({showModal: true});
    }



    render(){
        const {listDragons, showModal, showAlert} = this.state;
        return <>
            <div className="container">
                <button onClick={() => this.handleModalOpen()} className="btn btn-success ml-5 my-3">Criar</button>
                <div className="row">
                    <div className="col">
                        <table className="table cortexto">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Tipo</th>
                                    <th>Data</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                            {listDragons.map(
                                dragon => 
                                <tr>
                                     <td>{dragon.id}</td>
                                     <td>{dragon.name}</td>
                                     <td>{dragon.type}</td>
                                     <td>{dragon.createdAt}</td>
                                     <td>
                                         <button onClick={() => this.onEdit(dragon.id)} className="btn btn-primary">Editar</button>
                                         <button onClick={() => this.onDelete(dragon.id)} className="btn btn-danger ml-1">Deletar</button>
                                     </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={ ()=> this.handleModalClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Criar Dragão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.onCreate}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name"></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formType">
                            <Form.Label>
                                Type
                            </Form.Label>
                            <Form.Control type="text" name="type"></Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                                Submit
                        </Button>
                   </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ () => this.handleModalClose()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </>;
    }
}

export default Apidragon;