export default function CoreFeatures({title, description, img, onSelect}) { //component

  // 🎓 LEARNING: Event Handler for Click
  // When this component is clicked, call the onSelect function from parent
  function handleClick() {
    // Check if onSelect function was passed as prop
    if (onSelect) {
      onSelect(title); // Pass the title to parent component
    }
  }

  return (
    // 🎓 LEARNING: onClick Event Handler
    // Adding cursor pointer style to show it's clickable
    <li onClick={handleClick} style={{cursor: 'pointer'}} className="core-feature-item">
      <img src={img} alt=''/>
      <h3>{title}</h3>
      <p>{description}</p>
    </li>

  );
}