import { ImSpinner10 } from 'react-icons/im';

const Spinner = ({ className }) => {
    return (
        <div className={className}>
            <ImSpinner10 style={{
                animation: 'spinner 2s linear infinite',
                transformOrigin: '50% 50%'
            }} />
        </div>
    )
}

export default Spinner;