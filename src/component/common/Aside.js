import { Link } from "react-router-dom";

const Aside = () => {

    const onGithub = () => {
        window.open('https://github.com/choewy', '_blank');
    }

    return (
        <>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/todo'>Todo</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li onClick={onGithub} >Github</li>
            </ul>
            <footer>
                <p>✨ H201803138</p>
                <p>with React</p>
            </footer>
        </>
    )
}

export default Aside;