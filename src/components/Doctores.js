import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';

export default class Doctores extends Component {
    state = {
        doctores: [],
        statusDocs: false
    }

    //METODO PARA CARGAR LOS DOCTORES CON SU INCREMENTO EN UNA TABLA
    loadDoctores = () => {
        var request = "api/Doctores/DoctoresEspecialidad/" + this.props.especialidad;
        var url = Global.url + request;

        axios.get(url).then(response => {
            this.setState({
                doctores: response.data,
                statusDocs: true
            });
        });
    }

    //METODO PARA EJECUTAR FUNCIO AL INICIAR EL COMPONENTE
    componentDidMount = () => {
        this.loadDoctores();
    }

    //METODO PARA ACTUALIZAR EL COMPONENTE CUANDO VARIE LA ESPECIALIDAD
    componentDidUpdate = (oldProps) => {
        if(oldProps.especialidad != this.props.especialidad) {
            this.loadDoctores();
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.statusDocs == true && (

                        <table style={{ margin: "50px auto" }} border={1}>
                            <thead>
                                <tr>
                                    <td>Apellido</td>
                                    <td>Especialidad</td>
                                    <td>Salario</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    //RECORREMOS ARRAY DOCTORES
                                    this.state.doctores.map((doctor, index) => {
                                        return (
                                            <tr key={doctor.idDoctor}>
                                                <td>{doctor.apellido}</td>
                                                <td>{doctor.especialidad}</td>
                                                <td>{doctor.salario}</td>
                                            </tr>);
                                    })
                                }
                            </tbody>
                        </table>
                    )
                }
            </div>
        )

    }
}

