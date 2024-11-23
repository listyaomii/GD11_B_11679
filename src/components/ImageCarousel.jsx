import { Carousel } from "react-bootstrap";

// ImageCarousel menerima prop `images` yang berisi array objek gambar
const ImageCarousel = ({ images }) => (
  <Carousel>
    {images.map((image, index) => (
      <Carousel.Item key={index}>
        <img className="d-block w-100" src={image.img} alt={image.title} />
        <Carousel.Caption>
          <h3>{image.title}</h3>
          <p>{image.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
);

export default ImageCarousel;
