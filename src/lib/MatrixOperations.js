import { createInitialMatrix } from './MatrixModifers'

export const OPT_TRANSPOSE = "transpose"
export const OPT_DETERMINANT = "determinant"
export const OPT_SQUARE = "square"
export const OPT_CUBE = "cube"
export const OPT_ADD = "add"
export const OPT_SUBTRACT = "subtract"
export const OPT_MULTIPLY = "multiply"
export const OPT_INVERSE = "inverse"

export default class MatrixOperations {

    static doOperation( operation, matrixA, matrixB ) {
        let resultMatrix = null

        try {

            switch( operation ) {
                case OPT_TRANSPOSE: 
                    resultMatrix = MatrixOperations.transpose( matrixA )
                    break;
                case OPT_ADD: 
                    resultMatrix = MatrixOperations.add( matrixA, matrixB )
                    break;
                case OPT_SUBTRACT:
                    resultMatrix = MatrixOperations.subtract( matrixA, matrixB )
                    break;
                case OPT_MULTIPLY: 
                    resultMatrix = MatrixOperations.multiply( matrixA, matrixB )
                    break;
                case OPT_SQUARE:
                    resultMatrix = MatrixOperations.multiply( matrixA, matrixA )
                    break;
                case OPT_CUBE:
                    resultMatrix = MatrixOperations.multiply( MatrixOperations.multiply( matrixA, matrixA ), matrixA )
                    break;
                case OPT_DETERMINANT: 
                    resultMatrix = MatrixOperations.findDeterminant( matrixA )
                    break;
                case OPT_INVERSE:
                    resultMatrix = MatrixOperations.findInverse( matrixA )
                    break;
                default:
                    return [ null, "Unimplemented operation" ]
            }
        }
        catch ( error ) {
            return [ null, error || "Error while performing an operation with the provided matrices" ]
        }

        return [ resultMatrix, null ]
    }

    static transpose( matrix ) {
        let result = createInitialMatrix( getColCount( matrix ), getRowCount( matrix ) )

        for ( let row = 0; row < getRowCount( matrix ); row++ ) {
            for ( let col = 0; col < getColCount( matrix ); col++ ) {
                result[col][row] = matrix[row][col]
            }
        }

        return result
    }

    static add( a, b ) {
        if ( !areMatricesSameSize( a, b ) ) 
            throw new Error( "Tidak dapat menambah: ukuran matriks tidak sama!" )
        
        let result = a.map( ( row, rowIndex ) => 
            row.map( ( el, colIndex ) => el + b[rowIndex][colIndex] ) )

        return result 
    }

    static subtract( a, b ) {
        if ( !areMatricesSameSize( a, b ) ) 
            throw new Error( "Tidak dapat mengurangi: ukuran matriks tidak sama!" )
        
        let result = a.map( ( row, rowIndex ) => 
            row.map( ( el, colIndex ) => el - b[rowIndex][colIndex] ) )

        return result
    }

    static multiply( a, b ) {
        if ( !canMultiplyMatrices( a, b ) ) {
            throw new Error( "Tidak dapat mengkali matriks" )
        }

        let result = createInitialMatrix( getRowCount( a ), getColCount( b ) )
        // Calculate a value for every element in the result matrix
        for ( let row = 0; row < getRowCount( result ); row++ ) {
            for ( let col = 0; col < getColCount( result ); col++ ) {

                let elementValue = 0

                for( let index = 0; index < getRowCount( b ); index++ ) {
                    elementValue += a[row][index] * b[index][col]
                }

                result[row][col] = elementValue
            }
        }

        return result
    }

    static multiplyByConst( matrix, number ) {
        return matrix.map(
            row => row.map( el => ( el * number ) )
        )
    }

    static findDeterminant( m ) {
        if ( getColCount( m ) !== getRowCount( m ) ) {
            throw new Error( "Tidak dapat menemukan determinan: matriks tidak berbentuk persegi" )
        }

        if ( getColCount( m ) === 1 ) {
            return m[0][0]
        }
        else if ( getColCount( m ) === 2 ) {
            return m[0][0] * m[1][1] - m[0][1] * m[1][0]
        }
        
        // Pick the first row of the matrix
        let firstRow = m[0]
        let result = 0
        firstRow.forEach( ( val, col ) => {
            result += val * Math.pow( -1, col + 1 + 1 ) * MatrixOperations.getMinor( m, 0, col )
        } )

        return result
    }

    static getMinor( m, rowIndex, colIndex ) {
        
        // Remove the requested row
        let result = m.filter( ( val, r ) => r !== rowIndex )
        // Remove the requested column
        result = result.map(
            matrixRow => matrixRow.filter( ( el, col ) => col !== colIndex )
        )

        return MatrixOperations.findDeterminant( result )
    }

    static findInverse( m ) {
        if ( getColCount( m ) !== getRowCount( m ) ) {
            throw new Error( "Cannot find the inverse of a non square matrix" )
        }

        let determinant = MatrixOperations.findDeterminant( m )
        let result = createInitialMatrix( getRowCount( m ), getColCount( m ) )

        for ( let i = 0; i < getRowCount( m ); i++ ) {
            for ( let j = 0; j < getColCount( m ); j++ ) {
                result[j][i] = MatrixOperations.getMinor( m, i, j ) * m[i][j] * Math.pow( -1, i + j + 2 )
            }
        }

        return MatrixOperations.multiplyByConst( result, 1 / determinant )
    }

}

export const getColCount = matrix => matrix[0].length 
export const getRowCount = matrix => matrix.length
export const areMatricesSameSize = ( a, b ) => 
    getRowCount( a ) === getRowCount( b ) && getColCount( a ) === getColCount( b )
export const canMultiplyMatrices = ( a, b ) => 
    getColCount( a ) === getRowCount( b )