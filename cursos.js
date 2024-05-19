document.addEventListener('DOMContentLoaded', () => {
  const userGrid = document.getElementById('cr-grid');
  const cursosMatriculadosContainer = document.getElementById('cursos-matriculados');

  loadCourses(userGrid);

  function loadCourses(grid) {
      if (!grid) return;

      let courses = JSON.parse(localStorage.getItem('courses')) || [];
      courses.forEach(course => {
          const courseElement = createCourseElement(course.title, course.description, course.image);
          grid.appendChild(courseElement);
      });
  }

  function createCourseElement(title, description, image) {
      const course = document.createElement('div');
      course.classList.add('cr-curso');

      course.innerHTML = `
          <img src="${image}" alt="${title}" class="cr-img">
          <h3 class="cr-h3">${title}</h3>
          <p class="cr-p">${description}</p>
          <button class="cr-btn matricular-btn">Matricular</button>
      `;

      course.querySelector('.matricular-btn').addEventListener('click', () => {
          matricularCurso(title);
      });

      return course;
  }

  function matricularCurso(curso) {
      const confirmar = confirm(`¿Deseas matricularte en el curso: ${curso}?`);

      if (confirmar) {
          let cursosMatriculados = JSON.parse(localStorage.getItem('cursosMatriculados')) || [];
          if (!cursosMatriculados.includes(curso)) {
              cursosMatriculados.push(curso);
              localStorage.setItem('cursosMatriculados', JSON.stringify(cursosMatriculados));
              alert('Te has matriculado en el curso: ' + curso);
          } else {
              alert('Ya estás matriculado en este curso.');
          }
      }
  }

  if (cursosMatriculadosContainer) {
      const cursosMatriculados = JSON.parse(localStorage.getItem('cursosMatriculados')) || [];
      if (cursosMatriculados.length > 0) {
          cursosMatriculados.forEach(curso => {
              const cursoElement = document.createElement('div');
              cursoElement.className = 'cr-curso';
              cursoElement.innerHTML = `
                  <h3 class="cr-h3">${curso}</h3>
                  <button class="cr-btn-detalle" data-curso="${curso}">Ver Detalles</button>
                  <button class="cr-btn-eliminar" data-curso="${curso}">Eliminar</button>
              `;
              cursosMatriculadosContainer.appendChild(cursoElement);
          });

          document.querySelectorAll('.cr-btn-eliminar').forEach(btn => {
              btn.addEventListener('click', () => {
                  const curso = btn.getAttribute('data-curso');
                  const confirmar = confirm(`¿Estás seguro de que deseas eliminar el curso: ${curso}?`);
                  if (confirmar) {
                      let cursosMatriculados = JSON.parse(localStorage.getItem('cursosMatriculados')) || [];
                      cursosMatriculados = cursosMatriculados.filter(c => c !== curso);
                      localStorage.setItem('cursosMatriculados', JSON.stringify(cursosMatriculados));
                      btn.parentElement.remove();
                      alert('Has eliminado el curso: ' + curso);
                  }
              });
          });

          document.querySelectorAll('.cr-btn-detalle').forEach(btn => {
              btn.addEventListener('click', () => {
                  const curso = btn.getAttribute('data-curso');
                  localStorage.setItem('cursoActual', curso);
                  window.location.href = 'curso-detalle.html';
              });
          });
      } else {
          cursosMatriculadosContainer.innerHTML = '<p>No estás matriculado en ningún curso.</p>';
      }
  }

  const cursoTitulo = document.getElementById('curso-titulo');
  const cursoDescripcion = document.getElementById('curso-descripcion');
  if (cursoTitulo && cursoDescripcion) {
      const cursoActual = localStorage.getItem('cursoActual');
      if (cursoActual) {
          cursoTitulo.textContent = cursoActual;
          if (cursoActual === 'Desarrollo Web con HTML y CSS') {
              cursoDescripcion.textContent = 'Descubre cómo crear sitios web dinámicos y atractivos utilizando HTML y CSS.';
          } else if (cursoActual === 'Fundamentos de JavaScript') {
              cursoDescripcion.textContent = 'Aprende los fundamentos de JavaScript, incluyendo variables, tipos de datos y funciones.';
          } else if (cursoActual === 'Aprendizaje de Python') {
              cursoDescripcion.textContent = 'Aprende los conceptos básicos de Python, incluyendo sintaxis y programación orientada a objetos.';
          }
      }
  }
});
