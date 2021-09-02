import Loader from 'react-loader-spinner';

const Spinner = ({ type, color, height, width }) => {
    return (
        <Loader
            type={type}
            color={color}
            height={height}
            width={width}
        />
    )
}

export default Spinner;