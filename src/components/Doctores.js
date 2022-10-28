import React, { Component } from 'react'

export default class Doctores extends Component {
    render() {
        return (
            <tr key={this.props.idDoctor}>
                <td>{this.props.apellido}</td>
                <td>{this.props.especialidad}</td>
                <td>{this.props.salario}</td>
            </tr>
        );
    }
}

