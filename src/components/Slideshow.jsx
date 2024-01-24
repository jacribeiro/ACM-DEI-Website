import PropTypes from "prop-types";
import { useState } from "react";
import { MaterialSymbol } from "react-material-symbols";

const Slideshow = ({ display, handleToggle }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      src: "src/assets/slides/slide1.gif",
      text: "Clique no nó desejado para ampliar",
    },
    {
      src: "src/assets/slides/slide2.gif",
      text: "Clique no nó mais à esquerda para recuar um nível",
    },
    {
      src: "src/assets/slides/slide3.gif",
      text: "Use a tecla 'esc' para voltar ao estado inicial",
    },
    {
      src: "src/assets/slides/slide4.gif",
      text: "Use os filtros para alterar as cores",
    },
    {
      src: "src/assets/slides/slide5.gif",
      text: "A pesquisa realça todos os nós onde o termo de pesquisa for encontrado, assim como o 'percurso' até à raiz",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div id="overlay" style={{ display: display ? "flex" : "none" }}>
      <div id="slideshow">
        <MaterialSymbol
          icon="close"
          size={50}
          color="#0d0d0d"
          id="close-button"
          className="controls"
          onClick={() => handleToggle("howTo")}
        />
        <MaterialSymbol
          icon="arrow_back"
          size={58}
          color="#0d0d0d"
          id="prev-button"
          className="controls"
          onClick={prevSlide}
        />
        <div className="slide">
          <img className="slide" src={slides[currentSlide].src} />
          <p>{slides[currentSlide].text}</p>
        </div>
        <MaterialSymbol
          icon="arrow_forward"
          size={58}
          color="#0d0d0d"
          id="next-button"
          className="controls"
          onClick={nextSlide}
        />
      </div>
    </div>
  );
};

Slideshow.propTypes = {
  display: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

export default Slideshow;
