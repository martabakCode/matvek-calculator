import React from 'react';

import MatrixGridController from '../components/Matrix/MatrixGridController'
import SelectButton from '../components/SelectButton'
import { createInitialMatrix } from '../lib/MatrixModifers'
import MatrixOperations, {
    OPT_TRANSPOSE,
    OPT_DETERMINANT,
    OPT_SQUARE,
    OPT_CUBE,
    OPT_ADD,
    OPT_SUBTRACT,
    OPT_MULTIPLY,
    OPT_INVERSE
} from '../lib/MatrixOperations'

class Calculator extends React.Component {

    constructor( props ) {
        super( props )

        this.state = {
            matrixA: createInitialMatrix( 3, 3 ),
            matrixB: createInitialMatrix( 3, 3 ),
            resultMatrix: null,
            calculationError: null,
        }

        this.createOpSelectHandler = this.createOpSelectHandler.bind( this )
    }

    swapMatrices() {
        let matrixA = this.state.matrixA
        this.setState({
            matrixA: this.state.matrixB,
            matrixB: matrixA
        })
    }

    selectOperation( operation ) {
        const [ result, error ] = MatrixOperations.doOperation( operation, this.state.matrixA, this.state.matrixB )

        this.setState({
            resultMatrix: result,
            calculationError: error
        })
    }

    createOpSelectHandler = ( operation ) => {
        return () => this.selectOperation( operation )
    }

    render() {
        return (
            <div>
                <div className='container boxContainer'>
                    <div className='sm:justify-center items-start  flex flex-wrap'>
                        <div className='pr-8 mb-8' style={{ flex: 1 }}>
                            <MatrixGridController 
                                onChange={(mat) => this.setState({ matrixA: mat })} 
                                matrix={this.state.matrixA}>
                            </MatrixGridController>
                        </div>
                        <div className='mb-8' style={{ flex: 1 }}>
                            <MatrixGridController 
                                onChange={(mat) => this.setState({ matrixB: mat })} 
                                matrix={this.state.matrixB}>
                            </MatrixGridController>
                        </div>
                    </div>

                    <ButtonRow>
                        <SelectButton onSelect={this.swapMatrices.bind( this )}>Ubah Matrik</SelectButton>
                    </ButtonRow>

                    <ButtonRow title="Operasi Tunggal Matriks (yang di gunakan hanya matriks kiri)">
                        <SelectButton onSelect={this.createOpSelectHandler( OPT_TRANSPOSE )}>Transpos</SelectButton>
                        <SelectButton onSelect={this.createOpSelectHandler( OPT_SQUARE )}>pangkat 2</SelectButton>
                        <SelectButton onSelect={this.createOpSelectHandler( OPT_CUBE )}>pangkat 3</SelectButton>
                        <SelectButton onSelect={this.createOpSelectHandler( OPT_DETERMINANT )}>Mencari determinan</SelectButton>
                        <SelectButton onSelect={this.createOpSelectHandler( OPT_INVERSE )}>Mencari inverse matrix</SelectButton>
                    </ButtonRow>

                    <ButtonRow title="Operasi Aritmatik">
                        <SelectButton onSelect={this.createOpSelectHandler( OPT_ADD )}>Tambah</SelectButton>
                        <SelectButton onSelect={this.createOpSelectHandler( OPT_SUBTRACT )}>Kurang</SelectButton>
                        <SelectButton onSelect={this.createOpSelectHandler( OPT_MULTIPLY )}>Kali</SelectButton>
                    </ButtonRow>

                </div>


                {/* <ResultContainer matrix={this.state.resultMatrix} error={this.state.calculationError}></ResultContainer> */}
                {this.createResultContainer()}
            </div>
        )
    }


    createResultContainer() {
        const matrix = typeof( this.state.resultMatrix ) == "number" ? 
            [[ this.state.resultMatrix ]] : this.state.resultMatrix
        const error = this.state.calculationError

        if ( error ) {
            return (
                <div className='container boxContainer' style={{ borderTop: '5px solid #b71c1c'}}>
                    <div className='font-2xl mb-4'>Hasil</div>
                    {error.toString()}
                </div>
            )
        }
        else if ( matrix ) {
            return (
                <div className='container boxContainer' style={{ borderTop: '5px solid #C58940'}}>
                    <div className='font-2xl mb-4'>Hasil</div>
                    <MatrixGridController 
                        matrix={matrix} 
                        readonly>
                    </MatrixGridController>

                    <ButtonRow>
                        {/* When setting matrix, we need to copy it first */}
                        <SelectButton onSelect={() => this.setState({ matrixA: [...matrix] })}>Atur ke matriks A</SelectButton>
                        <SelectButton onSelect={() => this.setState({ matrixB: [...matrix] })}>Atur ke matriks B</SelectButton>
                    </ButtonRow>
                </div>
            )
        }
    
        return null;
    }

}

function ButtonRow({ title, children }) {

    return (
        <>
            {!!title ? <div className='font-lg mb-3'>{title}</div> : null}

            <div className='flex flew-wrap mb-5'>
                {children}
            </div>
        </>
    )
}

export default Calculator;
