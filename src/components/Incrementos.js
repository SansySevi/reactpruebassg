import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import Doctores from './Doctores';

export default class Incrementos extends Component {

    cajaEspacilidadRef = React.createRef();
    cajaIncrementoRef = React.createRef();

    state = {
        especialidades: [],
        statusEsp: false,
        statusPut: false
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
    }

    //METODO PARA EJECUTAR FUNCIO AL INICIAR EL COMPONENTE
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
                    this.state.statusPut == true && (
                        //LLAMAMOS AL COMPONENTE DOCTORES PARA DIBUJAR LA TABLA
                        <Doctores especialidad={this.cajaEspacilidadRef.current.value}/>
                    )
                }
            </div>
        )
    }
}
