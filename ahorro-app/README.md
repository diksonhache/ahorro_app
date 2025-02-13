<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi App de Ahorro</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <div class="container">
        <header>
            <h1>Ahorro App</h1>
        </header>

        <main>
            <section id="ahorro-actual">
                <div class="section-header">
                    <i class="fas fa-piggy-bank"></i>
                    <h2>Ahorro Actual</h2>
                </div>
                <p id="monto-ahorrado">$0</p>
            </section>

            <section id="meta">
                <div class="section-header">
                    <i class="fas fa-bullseye"></i>
                    <h2>Meta de Ahorro</h2>
                </div>
                <div class="input-group">
                    <input type="number" id="meta-input" placeholder="Ingrese su meta">
                    <button id="establecer-meta"><i class="fas fa-check"></i></button>
                </div>
                <p id="meta-alcanzada">Progreso: $0 / $0</p>
            </section>

            <section id="agregar-ahorro">
                <div class="section-header">
                    <i class="fas fa-plus-circle"></i>
                    <h2>Agregar Ahorro</h2>
                </div>
                <div class="input-group">
                    <input type="number" id="agregar-input" placeholder="Ingrese el monto a agregar">
                    <button id="agregar-boton"><i class="fas fa-plus"></i></button>
                </div>
            </section>
        </main>
    </div>

    <footer>
        <p>&copy; 2025 Mi App de Ahorro</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>