export default function CoreFeatures({title, description, img}) { //component

  return (
    <li>
      <img src={img} alt=''/>
      <h3>{title}</h3>
      <p>{description}</p>
    </li>

  );
}