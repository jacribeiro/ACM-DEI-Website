import { useEffect, useRef } from "react";
import * as d3 from "d3";

const Icicle = () => {
  const width = screen.width < 600 ? 480 : 928;
  const height =
    2 * window.innerHeight ||
    2 * document.documentElement.clientHeight ||
    2 * document.body.clientHeight;

  const ref = useRef();

  useEffect(() => {
    d3.json("/acm_dei_codes.json").then((data) => {
      const hierarchy = d3.hierarchy(data);

      // Define o tamanho dos retângulos, tendo por base o número de "irmãos" de um nó, dando tamanho igual a todos
      hierarchy
        .eachBefore((d) => {
          if (d.parent) {
            d.value = d.parent.value / d.parent.children.length;
          } else {
            d.value = 100;
          }
        })
        .sort((a, b) => b.height - a.height || b.value - a.value);

      const columns = screen.width < 600 ? 2 : 3;

      const root = d3
        .partition()
        .size([height, ((hierarchy.height + 1) * width) / columns])(hierarchy);

      // Cria em cada nó um array com as sub-áreas dos seus descendentes, e um array com todas as sub-áreas, suas e dos descendentes
      root.each((node) => {
        node.data.descendantsSubareas = new Set();
        fillDescendantSubareas(node, node.data.descendantsSubareas);
        node.data.descendantsSubareas = Array.from(
          node.data.descendantsSubareas
        );
        node.data.totalSubareas = mergeSubareas(node);
      });

      const svg = d3
        .create("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

      const cell = svg
        .selectAll("g")
        .data(root.descendants())
        .join("g")
        .attr("transform", (d) => `translate(${d.y0}, ${d.x0})`);

      const rect = cell
        .append("rect")
        .attr("width", (d) => d.y1 - d.y0 - 1)
        .attr("height", (d) => rectHeight(d))
        .attr("fill-opacity", 0.6)
        .attr("fill", "#ccc")
        .style("cursor", "pointer")
        .on("click", clicked);

      const text = cell
        .append("text")
        .style("user-select", "none")
        .attr("pointer-events", "none")
        .attr("x", 4)
        .attr("y", 16)
        .attr("fill-opacity", (d) => +labelVisible(d));

      text.each(function (d) {
        const split = screen.width < 600 ? 3 : 4;
        const [firstLine, secondLine] = splitText(d, split);
        d3.select(this).append("tspan").text(firstLine);
        if (secondLine) {
          d3.select(this)
            .append("tspan")
            .attr("x", 4)
            .attr("dy", 16)
            .text(secondLine);
        }
      });

      const tspan = text
        .append("tspan")
        .attr("x", 4)
        .attr("dx", "-0.5em")
        .attr("dy", 16)
        .attr("fill-opacity", (d) => +labelVisible(d))
        .text((d) => ` ${d.data.code}`);

      cell.append("title").text((d) => `${d.data.totalSubareas.join(", ")}`);

      let focus = root;

      const container = d3.select(ref.current);
      container.node().appendChild(svg.node());

      /**
       * Função chamada quando se clica num retângulo, atualiza o layout
       * @param {*} event
       * @param {node} p O nó que foi clicado
       */
      function clicked(event, p) {
        focus = focus === p ? (p = p.parent) : p;

        root.each(
          (d) =>
            (d.target = {
              x0: ((d.x0 - p.x0) / (p.x1 - p.x0)) * height,
              x1: ((d.x1 - p.x0) / (p.x1 - p.x0)) * height,
              y0: d.y0 - p.y0,
              y1: d.y1 - p.y0,
              name: d.data.name,
            })
        );

        const t = cell
          .transition()
          .duration(850)
          .attr(
            "transform",
            (d) => `translate(${d.target.y0}, ${d.target.x0})`
          );

        rect.transition(t).attr("height", (d) => rectHeight(d.target));
        text.transition(t).attr("fill-opacity", (d) => +labelVisible(d.target));
        tspan
          .transition(t)
          .attr("fill-opacity", (d) => labelVisible(d.target) * 0.7);
      }

      /**
       * Cálculo da altura de um retângulo
       * @param {node} d Node correspondente ao retângulo
       * @returns Altura do retângulo
       */
      function rectHeight(d) {
        return d.x1 - d.x0 - Math.min(1, (d.x1 - d.x0) / 2);
      }

      /**
       * Determina se a etiqueta de um retângulo é visível, tendo em conta o seu tamanho
       * @param {node} d Node correspondente ao retângulo
       * @returns Booleano que indica se a etiqueta é visível
       */
      function labelVisible(d) {
        const name = d.name ? d.name : d.data.name;
        if (name.split(/\s+/).length > 4) {
          return d.y1 <= width && d.y0 >= 0 && d.x1 - d.x0 > 50;
        } else {
          return d.y1 <= width && d.y0 >= 0 && d.x1 - d.x0 > 37;
        }
      }

      /**
       * Divide o nome de um nó em duas linhas
       * @param {node} node Nó a dividir
       * @param {int} wordCount Número de palavras da primeira linha
       * @returns Array com a primeira e segunda linhas
       */
      function splitText(node, wordCount) {
        const words = node.data.name.split(/\s+/);
        const firstLine = words.slice(0, wordCount).join(" ");
        const secondLine = words.slice(wordCount).join(" ");
        return [firstLine, secondLine];
      }

      /**
       * Preenche o conjunto de sub-áreas dos descendentes de um nó, de forma recursiva
       * @param {node} node Nó a preencher
       * @param {Array} descendantsSubareas Conjunto de sub-áreas dos descendentes
       */
      function fillDescendantSubareas(node, descendantsSubareas) {
        if (node.children) {
          node.children.forEach((child) => {
            if (child.data.subareas) {
              child.data.subareas.forEach((subarea) =>
                descendantsSubareas.add(subarea.name)
              );
            }
            fillDescendantSubareas(child, descendantsSubareas);
          });
        }
      }

      /**
       * Cria um array com todas as sub-áreas de um nó e dos seus descendentes
       * @param {node} node Nó a preencher
       * @returns Array com todas as sub-áreas de um nó e dos seus descendentes
       */
      function mergeSubareas(node) {
        let totalSubareas = [];
        node.data.subareas.forEach((subarea) => {
          totalSubareas.push(subarea.name);
        });
        node.data.descendantsSubareas.forEach((subarea) => {
          if (!totalSubareas.includes(subarea)) {
            totalSubareas.push(subarea);
          }
        });
        return totalSubareas;
      }
    });
  }, [height, width]);

  return <svg ref={ref} />;
};

export default Icicle;
