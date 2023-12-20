import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import toast from "react-hot-toast";
import "../Styles/tutorcard.css";

function TutorCard({
  name,
  address,
  rating,
  id,
  website,
  setDeleter,
  deleter,
}) {
  const handleDelete = async (event) => {
    event.preventDefault();

    const res = await axios.delete(`http://localhost:2222/deleteSchools/${id}`);
    if (res.data.success) {
      setDeleter(!deleter);
      toast.success("School Removed");
    }
  };

  return (
    <div
      style={{
        margin: "5px auto",
      }}
    >
  
      <Card style={{ width: "21.5em"}}>
        <div class="card-header text-center">My Saved School</div>
        <Card.Body style={{ width: "18rem" }}>
          <Card.Text style={{ width: "18rem" }}>
            {name}
            <br></br>
            <br></br>
            Address: {address}
            <br></br>
            <br></br>
            Rating: {rating}
            <br></br>
            <br></br>
            Google Maps Link:
            <a href={website}> {website}</a>
          </Card.Text>
        </Card.Body>
        <Card.Footer className='text-center'>
          <Button onClick={(event) => handleDelete(event)} className='ibtn'>Remove</Button>
        </Card.Footer>
      </Card>
   </div> 
  );
}

export default TutorCard;
