import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';

export default class Incrementos extends Component {

    cajaEspacilidadRef = React.createRef();
    cajaIncrementoRef = React.createRef();

    state = {
        especialidades: [],
        statusEsp: false,
        statusPut: false,
        doctores: [],
        statusDocs: false
    }

    //METODO PARA DIBUJAR LOS OPTIONS DEL SELECT
    loadEspecialidades = () => {
        var request = "api/Doctores/Especialidades";
        var url = Global.url + request;

        axios.get(url).then(response => {
            this.setState({
                especialidades: response.data,
                statusEsp: true
            });
        });
    }

    //METODO PARA CARGAR LOS DOCTORES CON SU INCREMENTO EN UNA TABLA
    loadDoctores = (oficio) => {
        var request = "api/Doctores/DoctoresEspecialidad/" + oficio;
        var url = Global.url + request;

        axios.get(url).then(response => {
            this.setState({
                doctores: response.data,
                statusDocs: true
            });
        });
    }

    //METODO PARA HACER EL PUT EN LA API
    incrementoSalario = (e) => {
        e.preventDefault();
        var request = "api/Doctores/" + this.cajaEspacilidadRef.current.value + "/" + this.cajaIncrementoRef.current.value;
        var url = Global.url + request;

        axios.put(url).then(response => {
            this.setState({
                statusPut: true
            })
        });

        this.loadDoctores(this.cajaEspacilidadRef.current.value);
    }

    componentDidMount = () => {
        this.loadEspecialidades();
    }




    render() {
        return (
            <div>
                <h1>Incremento salarial doctores</h1>

                <form onSubmit={this.incrementoSalario}>
                    <label>Seleccione una especialidad: </label>
                    <select ref={this.cajaEspacilidadRef}>
                        {
                            this.state.statusEsp == true && (
                                this.state.especialidades.map((especialidad, index) => {
                                    return (
                                        <option key={index}>{especialidad}</option>
                                    )
                                })
                            )
                        }
                    </select><br />
                    <label>Incremento salarial </label>
                    <input ref={this.cajaIncrementoRef}></input>
                    <button>Incrementar salarios</button>
                </form>

                {



                    this.state.statusDocs == true && (

                        <table style={{margin:"50px auto"}} border={1}>
                            <thead>
                                <tr>
                                    <td>Apellido</td>
                                    <td>Especialidad</td>
                                    <td>Salario</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.doctores.map((doctor,index)=> {
                                        return(
                                            <tr key={doctor.idDoctor}>
                                                <td>{doctor.apellido}</td>
                                                <td>{doctor.especialidad}</td>
                                                <td>{doctor.salario}</td>
                                            </tr>
                                        )
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
