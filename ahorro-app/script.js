/* filepath: /c:/Users/Dikson/Documents/ahorro-app/script.js */
document.addEventListener('DOMContentLoaded', function() {
    const montoAhorradoElement = document.getElementById('monto-ahorrado');
    const metaInputElement = document.getElementById('meta-input');
    const establecerMetaBoton = document.getElementById('establecer-meta');
    const metaAlcanzadaElement = document.getElementById('meta-alcanzada');
    const resultadoCalculoElement = document.getElementById('resultado-calculo');
    const metasGuardadasElement = document.getElementById('metas-guardadas');
    const ahorroPeriodicoInputElement = document.getElementById('ahorro-periodico-input');
    const periodoAhorroElement = document.getElementById('periodo-ahorro');
    const categoriaMetaElement = document.getElementById('categoria-meta');
    const cambiarTemaBoton = document.getElementById('cambiar-tema');
    const mensajesElement = document.getElementById('mensajes');

    let ahorroActual = 0;
    let metas = [];
    let temaOscuro = localStorage.getItem('temaOscuro') === 'true'; // Recuperar el tema del localStorage

    function actualizarAhorroVisual() {
        montoAhorradoElement.textContent = `$${ahorroActual.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        metaAlcanzadaElement.textContent = `Progreso: $${ahorroActual.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / $${meta}`;
    }

    function calcularTiempoParaAlcanzarMeta(meta, ahorroPeriodico, periodo) {
        let tiempo;
        switch (periodo) {
            case 'diario':
                tiempo = meta / ahorroPeriodico;
                break;
            case 'semanal':
                tiempo = meta / ahorroPeriodico * 7; // Convertir a días
                break;
            case 'mensual':
                tiempo = meta / ahorroPeriodico * 30.44; // Convertir a días (promedio)
                break;
            default:
                tiempo = 0;
        }

        if (tiempo < 30) {
            return `Ahorrarás $${meta} en ${tiempo.toFixed(0)} días.`;
        } else {
            tiempo = tiempo / 30.44; // Convertir a meses
            return `Ahorrarás $${meta} en ${tiempo.toFixed(1)} meses.`;
        }
    }

    function mostrarMetasGuardadas() {
        metasGuardadasElement.innerHTML = '';
        metas.forEach((metaObj, index) => {
            const metaElement = document.createElement('li');
            metaElement.classList.add('meta-item'); // Agregamos una clase para identificar los elementos
            const tiempoRestante = calcularTiempoRestante(metaObj.meta, metaObj.ahorro, metaObj.ahorroPeriodico, metaObj.periodo);
            const progresoPorcentaje = (metaObj.ahorro / metaObj.meta) * 100;

            // Formatear los números con comas
            const ahorroFormateado = metaObj.ahorro.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            const metaFormateada = metaObj.meta.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            // Determinar el color de la barra de progreso
            let progressBarColor = '';
            if (progresoPorcentaje < 33) {
                progressBarColor = 'red';
            } else if (progresoPorcentaje < 66) {
                progressBarColor = 'yellow';
            } else {
                progressBarColor = 'green';
            }

            metaElement.innerHTML = `
                <div class="meta-header">
                    <span>${ahorroFormateado} / ${metaFormateada}</span>
                    <button class="expand-meta">+</button>
                </div>
                <div class="meta-details">
                    <p>Descripción: ${metaObj.descripcion || 'Sin descripción'}</p>
                    <p>Categoría: ${metaObj.categoria}</p>
                    <div class="progress-bar">
                        <div class="progress ${progressBarColor}" style="width: ${progresoPorcentaje}%"></div>
                    </div>
                    <span>Tiempo Restante Estimado: ${tiempoRestante}</span>
                    <div class="meta-actions">
                        <button class="agregar-meta-ahorro" data-index="${index}">Agregar Ahorro</button>
                        <button class="eliminar-meta eliminar-meta-button" data-index="${index}">Eliminar Meta</button>
                    </div>
                </div>
            `;
            metasGuardadasElement.appendChild(metaElement);

            // Ocultar los detalles al principio
            const metaDetails = metaElement.querySelector('.meta-details');
            metaDetails.style.display = 'none';

            // Agregar evento para expandir/contraer la meta
            const expandButton = metaElement.querySelector('.expand-meta');
            expandButton.addEventListener('click', function(event) {
                event.stopPropagation(); // Evitar que el clic se propague al li
                if (metaDetails.style.display === 'none') {
                    metaDetails.style.display = 'block';
                    expandButton.textContent = "-";
                } else {
                    metaDetails.style.display = 'none';
                    expandButton.textContent = "+";
                }
            });

            // Evitar que se cierre al hacer clic dentro de los detalles
            metaDetails.addEventListener('click', function(event) {
                event.stopPropagation();
            });
        });

        const agregarMetaAhorroButtons = document.querySelectorAll('.agregar-meta-ahorro');
        agregarMetaAhorroButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                const metaObj = metas[index];
                const montoAgregar = parseFloat(prompt(`Ingrese el monto a agregar a la meta de $${metaObj.meta}:`)) || 0;
                metaObj.ahorro += montoAgregar;
                ahorroActual += montoAgregar;
                actualizarAhorroVisual();
                mostrarMensaje("¡Ahorro agregado con éxito!", "success");
                mostrarMetasGuardadas();
                guardarMetasEnLocalStorage();
            });
        });

        const eliminarMetaButtons = document.querySelectorAll('.eliminar-meta');
        eliminarMetaButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                metas.splice(index, 1);
                mostrarMetasGuardadas();
                guardarMetasEnLocalStorage();
            });
        });
    }

    function calcularTiempoRestante(meta, ahorroActual, ahorroPeriodico, periodo) {
        const ahorroRestante = meta - ahorroActual;
        let tiempoRestante;

        switch (periodo) {
            case 'diario':
                tiempoRestante = ahorroRestante / ahorroPeriodico;
                return `${tiempoRestante.toFixed(1)} días`;
            case 'semanal':
                tiempoRestante = ahorroRestante / ahorroPeriodico;
                return `${tiempoRestante.toFixed(1)} semanas`;
            case 'mensual':
                tiempoRestante = ahorroRestante / ahorroPeriodico;
                return `${tiempoRestante.toFixed(1)} meses`;
            default:
                return 'Desconocido';
        }
    }

    function guardarMetasEnLocalStorage() {
        localStorage.setItem('metasAhorro', JSON.stringify(metas));
    }

    function mostrarMensaje(mensaje, tipo = 'info') {
        const mensajeElement = document.createElement('div');
        mensajeElement.classList.add('mensaje', tipo);
        mensajeElement.textContent = mensaje;
        mensajesElement.appendChild(mensajeElement);

        // Eliminar el mensaje después de unos segundos
        setTimeout(() => {
            mensajeElement.remove();
        }, 3000);
    }

    function aplicarTema(tema) {
        if (tema === 'oscuro') {
            document.body.classList.add('tema-oscuro');
            cambiarTemaBoton.textContent = 'Cambiar a tema claro';
        } else {
            document.body.classList.remove('tema-oscuro');
            cambiarTemaBoton.textContent = 'Cambiar a tema oscuro';
        }
    }

    establecerMetaBoton.addEventListener('click', function() {
        const meta = parseFloat(metaInputElement.value) || 0;
        const ahorroPeriodico = parseFloat(ahorroPeriodicoInputElement.value) || 0;
        const periodo = periodoAhorroElement.value;
        const descripcion = prompt("Ingrese una descripción para su meta (opcional):");
        const categoria = categoriaMetaElement.value;

        const tiempoParaAlcanzarMeta = calcularTiempoParaAlcanzarMeta(meta, ahorroPeriodico, periodo);

        const metaObj = {
            meta: meta,
            ahorroPeriodico: ahorroPeriodico,
            periodo: periodo,
            ahorro: 0,
            descripcion: descripcion,
            categoria: categoria
        };
        metas.push(metaObj);

        actualizarAhorroVisual();
        resultadoCalculoElement.textContent = tiempoParaAlcanzarMeta;
        mostrarMensaje("¡Meta creada con éxito!", "success");
        mostrarMetasGuardadas();
        guardarMetasEnLocalStorage();
    });

    cambiarTemaBoton.addEventListener('click', function() {
        temaOscuro = !temaOscuro;
        localStorage.setItem('temaOscuro', temaOscuro); // Guardar el tema en el localStorage
        aplicarTema(temaOscuro ? 'oscuro' : 'claro');
    });

    if (localStorage.getItem('metasAhorro')) {
        metas = JSON.parse(localStorage.getItem('metasAhorro'));
        mostrarMetasGuardadas();
    }

    aplicarTema(temaOscuro ? 'oscuro' : 'claro');
    actualizarAhorroVisual();
});