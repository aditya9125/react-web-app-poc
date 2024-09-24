import image_ReactCoreConcepts from '../assets/react-core-concepts.png'
import genRandomInt from '../support/utils';
import './Header.css'

const industryTitles = ['Entertainment', 'Cinema', 'Music'];

export default function Header() { //component
    const industryTitle = industryTitles[genRandomInt(2)];
    return (<header>
        <img src={image_ReactCoreConcepts} alt="Stylized atom" />
        <h1>MY CINEMA</h1>
        <p>
            Where you speak directly to {industryTitle} industry!
        </p>
    </header>)
}