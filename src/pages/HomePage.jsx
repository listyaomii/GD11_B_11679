import {Container, Row, Col} from "react-bootstrap";
import ImageCarousel from "../components/ImageCarousel";
import imgFeaturettel from "../assets/images/featurette-1.jpg";
import imgFeaturette2 from "../assets/images/featurette-2.jpg";
import imgBakery1 from "../assets/images/bakery1.jpeg";
import imgBakery2 from "../assets/images/bakery2.jpeg";
import imgBakery3 from "../assets/images/bakery3.jpeg";
import pastry1 from "../assets/images/pastry1.jpg";  
import pastry2 from "../assets/images/pastry2.jpg";  
import pastry3 from "../assets/images/pastry3.jpg";  
import pastry4 from "../assets/images/pastry4.jpg"; 

const images = [
    {
        img: imgBakery1,
        title: "First slide label",
        description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    },
    {
        img: imgBakery2,
        title: "Second slide label",
        description: "Lorem ipsum dolor sit amet, consect nsectetur adipiscing elit.",
    },
    {
        img: imgBakery3,
        title: "Third slide label",
        description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur."
    },
];

const foodData = [
  {
    img: pastry1, 
    title: "Delicious Croissant",
    description: "A buttery and flaky croissant, freshly baked to perfection, with a golden crisp on the outside and soft, melt-in-your-mouth layers inside. Perfect for breakfast or a snack at any time of the day.",
  },
  {
    img: pastry2, 
    title: "Parisian-Style Breads",
    description: "Soft, airy loaves of Parisian-style bread, crafted with traditional methods and premium ingredients. The subtle, rustic flavor of these breads pairs wonderfully with a variety of spreads and toppings.",
  },
  {
    img: pastry3, 
    title: "Elegant Cakes",
    description: "Exquisitely crafted cakes that are as beautiful as they are delicious. From rich chocolate layers to light, airy sponges, each bite is a perfect balance of texture and flavor, designed for the most special occasions.",
  },
  {
    img: pastry4, 
    title: "Delectable Cake Slices",
    description: "Indulge in our selection of decadent cake slices, perfect for those who crave a sweet treat. From creamy cheesecakes to velvety chocolate layers, each slice is a moment of pure indulgence.",
  },
];


const HomePage = () => {
  return (
      <>
          <ImageCarousel images={images} />
          <Container className="mt-5">
              <Row>
                  <Col md={7}>
                      <h2 className="fw-normal">
                          Bakery pertama dan satu-satunya <strong>yang fiksional</strong><div className=""></div>
                      </h2>
                      <p className="lead">
                          Diciptakan oleh <strong>[Komang Listya Omi Pradnyani]</strong>, Mahasiswa Universitas Atma Jaya Yogyakarta dari program studi Informatika.
                      </p>
                      <p className="lead">
                          Nomor Pokok Mahasiswa: <strong>[220711679]</strong>.
                      </p>
                  </Col>
                  <Col md={5}>
                      <img src={imgFeaturettel} className="img-fluid mx-auto rounded shadow" role="img" aria-label="Gambar featurette 1" />
                  </Col>
              </Row>
              <hr className="mt-5 mb-5"/>

              {/* Gambar Selang-seling */}
              <h1 className="mb-4">Explore Our Food</h1>
              {foodData.map((item, index) => (
                  <Row className="mb-4 align-items-center" key={index}>
                      <Col md={index % 2 === 0 ? 6 : { order: "last" }} className="mb-3">
                          <img src={item.img} alt={item.title} className="img-fluid rounded" />
                      </Col>
                      <Col md={index % 2 === 0 ? 6 : { order: "first" }}>
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                      </Col>
                  </Row>
              ))}
          </Container>
      </>
  );
};


export default HomePage;