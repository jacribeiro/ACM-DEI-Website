import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import { styled } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ProfessorList from "./ProfessorList";

// Processamento dos professores e subáreas

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  "&::before": {
    display: "none",
  },
}));

const TransparentIcon = () => (
  <div style={{ width: "1.3rem", height: "1.3rem" }} />
);

const AccordionSummary = styled(({ showIcon = true, ...props }) => (
  <MuiAccordionSummary
    expandIcon={
      showIcon ? (
        <ArrowRightIcon sx={{ fontSize: "1.3rem" }} />
      ) : (
        <TransparentIcon />
      )
    }
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  display: "flex",
  alignItems: "center",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    margin: 0,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: 0,
}));

const FilterBox = ({ onCheckedChange, className }) => {
  const [checkedState, setCheckedState] = useState({
    subarea1: true,
    subarea2: true,
    subarea3: true,
    subarea4: true,
    subarea5: true,
    subarea6: true,
    multiple: true,
    noSubarea: false,
  });

  const [subareas_professors, setSubareasProfessors] = useState({
    "Arquiteturas e Sistemas de Computação": {
      primary: [],
      secondary: [],
    },
    "Computação Gráfica e Media Digitais Interativos": {
      primary: [],
      secondary: [],
    },
    "Engenharia de Software": {
      primary: [],
      secondary: [],
    },
    "Ciência e Tecnologia da Programação": {
      primary: [],
      secondary: [],
    },
    "Sistemas de Informação": {
      primary: [],
      secondary: [],
    },
    "Sistemas Inteligentes": {
      primary: [],
      secondary: [],
    },
  });

  useEffect(() => {
    fetch("/subareas_professors.json")
      .then((response) => response.json())
      .then((data) => {
        const professors = data.professors;
        const newSubareasProfessors = JSON.parse(
          JSON.stringify(subareas_professors)
        );

        for (const professor of professors) {
          if (Object.keys(newSubareasProfessors).includes(professor.primary)) {
            newSubareasProfessors[professor.primary].primary.push(
              professor.name
            );
          }
          if (
            Object.keys(newSubareasProfessors).includes(professor.secondary)
          ) {
            newSubareasProfessors[professor.secondary].secondary.push(
              professor.name
            );
          }
        }
        setSubareasProfessors(newSubareasProfessors);
      })
      .catch((error) =>
        console.error("Could not read professors file:", error)
      );
  }, []);

  useEffect(() => {
    onCheckedChange(makeCheckedObject(checkedState));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedState]);

  const idToLabelMap = {
    subarea1: "Arquiteturas e Sistemas de Computação",
    subarea2: "Computação Gráfica e Media Digitais Interativos",
    subarea3: "Engenharia de Software",
    subarea4: "Ciência e Tecnologia da Programação",
    subarea5: "Sistemas de informação",
    subarea6: "Sistemas inteligentes",
    multiple: "Múltiplas sub-áreas",
    noSubarea: "Sem sub-áreas",
  };

  const makeCheckedObject = useCallback((checkedState) => {
    return Object.keys(checkedState)
      .filter((key) => checkedState[key])
      .map((key) => idToLabelMap[key]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = useCallback((event) => {
    const { id, checked } = event.target;
    setCheckedState((prevState) => {
      const newState = { ...prevState, [id]: checked };
      return newState;
    });
  }, []);

  const resetCheckboxes = () => {
    setCheckedState(() => {
      const newState = {
        subarea1: true,
        subarea2: true,
        subarea3: true,
        subarea4: true,
        subarea5: true,
        subarea6: true,
        multiple: true,
        noSubarea: false,
      };
      return newState;
    });
  };

  const clearCheckboxes = () => {
    setCheckedState(() => {
      const newState = {
        subarea1: false,
        subarea2: false,
        subarea3: false,
        subarea4: false,
        subarea5: false,
        subarea6: false,
        multiple: false,
        noSubarea: false,
      };
      return newState;
    });
  };

  return (
    <div id="legend" className={className}>
      <h2>Legenda</h2>
      <Accordion>
        <AccordionSummary>
          <span className="color" style={{ backgroundColor: "#498b49" }}></span>
          <div className="checkbox-item">
            <label htmlFor="subarea1">
              Arquiteturas e Sistemas de Computação
            </label>
            <input
              type="checkbox"
              id="subarea1"
              checked={checkedState.subarea1}
              onChange={handleInputChange}
            />
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <ProfessorList
            items={subareas_professors["Arquiteturas e Sistemas de Computação"]}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <span className="color" style={{ backgroundColor: "#f2be22" }}></span>
          <div className="checkbox-item">
            <label htmlFor="subarea2">
              Computação Gráfica e Media Digitais Interativos
            </label>
            <input
              type="checkbox"
              id="subarea2"
              checked={checkedState.subarea2}
              onChange={handleInputChange}
            />
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <ProfessorList
            items={
              subareas_professors[
                "Computação Gráfica e Media Digitais Interativos"
              ]
            }
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <span className="color" style={{ backgroundColor: "#ff7b2f" }}></span>
          <div className="checkbox-item">
            <label htmlFor="subarea3">Engenharia de Software</label>
            <input
              type="checkbox"
              id="subarea3"
              checked={checkedState.subarea3}
              onChange={handleInputChange}
            />
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <ProfessorList
            items={subareas_professors["Engenharia de Software"]}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <span className="color" style={{ backgroundColor: "#fc8bba" }}></span>
          <div className="checkbox-item">
            <label htmlFor="subarea4">
              Ciência e Tecnologia da Programação
            </label>
            <input
              type="checkbox"
              id="subarea4"
              checked={checkedState.subarea4}
              onChange={handleInputChange}
            />
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <ProfessorList
            items={subareas_professors["Ciência e Tecnologia da Programação"]}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <span className="color" style={{ backgroundColor: "#146c94" }}></span>
          <div className="checkbox-item">
            <label htmlFor="subarea5">Sistemas de informação</label>
            <input
              type="checkbox"
              id="subarea5"
              checked={checkedState.subarea5}
              onChange={handleInputChange}
            />
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <ProfessorList
            items={subareas_professors["Sistemas de Informação"]}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <span className="color" style={{ backgroundColor: "#dd98e4" }}></span>
          <div className="checkbox-item">
            <label htmlFor="subarea6">Sistemas Inteligentes</label>
            <input
              type="checkbox"
              id="subarea6"
              checked={checkedState.subarea6}
              onChange={handleInputChange}
            />
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <ProfessorList items={subareas_professors["Sistemas Inteligentes"]} />
        </AccordionDetails>
      </Accordion>
      <Accordion className="non-clickable">
        <AccordionSummary showIcon={false}>
          <span className="color" style={{ backgroundColor: "#6ab0ff" }}></span>
          <div className="checkbox-item">
            <label htmlFor="multiple">Múltiplas sub-áreas</label>
            <input
              type="checkbox"
              id="multiple"
              checked={checkedState.multiple}
              onChange={handleInputChange}
            />
          </div>
        </AccordionSummary>
      </Accordion>
      <Accordion className="non-clickable">
        <AccordionSummary showIcon={false}>
          <span className="color" style={{ backgroundColor: "#444" }}></span>
          <div className="checkbox-item">
            <label htmlFor="noSubarea">Sem sub-áreas</label>
            <input
              type="checkbox"
              id="noSubarea"
              checked={checkedState.noSubarea}
              onChange={handleInputChange}
            />
          </div>
        </AccordionSummary>
      </Accordion>
      <span id="legend-reset" className="reset" onClick={resetCheckboxes}>
        Selecionar todos
      </span>
      <span id="legend-clear" className="reset" onClick={clearCheckboxes}>
        Limpar seleção
      </span>
    </div>
  );
};

FilterBox.propTypes = {
  onCheckedChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default FilterBox;
